import { getAllowedOrigin, buildCorsHeaders } from './cors.js'
import { checkRateLimit } from './rateLimit.js'
import { askAssistant, UpstreamError } from './ai.js'

const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_TURNS = 6

function jsonResponse(body, status, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const origin = getAllowedOrigin(request, env)
    const corsHeaders = buildCorsHeaders(origin)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (url.pathname !== '/chat' || request.method !== 'POST') {
      return jsonResponse({ error: 'not_found' }, 404, corsHeaders)
    }

    let payload
    try {
      payload = await request.json()
    } catch {
      return jsonResponse({ error: 'invalid_json' }, 400, corsHeaders)
    }

    const { message, history } = payload

    if (typeof message !== 'string' || message.trim().length === 0 || message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse({ error: 'invalid_message' }, 400, corsHeaders)
    }

    if (history !== undefined && !Array.isArray(history)) {
      return jsonResponse({ error: 'invalid_history' }, 400, corsHeaders)
    }

    const boundedHistory = Array.isArray(history)
      ? history
          .filter(
            (turn) =>
              turn &&
              (turn.role === 'user' || turn.role === 'assistant') &&
              typeof turn.text === 'string',
          )
          .slice(-MAX_HISTORY_TURNS)
      : []

    const rateLimitResult = await checkRateLimit(request, env)
    if (rateLimitResult.limited) {
      return jsonResponse(
        {
          error: 'rate_limited',
          message: "You've reached the hourly limit for AskDuart — try again in a bit.",
        },
        429,
        { ...corsHeaders, 'Retry-After': String(rateLimitResult.retryAfter) },
      )
    }

    try {
      const result = await askAssistant({ message: message.trim(), history: boundedHistory, env })
      return jsonResponse(result, 200, corsHeaders)
    } catch (err) {
      if (err instanceof UpstreamError) {
        return jsonResponse({ error: 'upstream_error', message: err.message }, 502, corsHeaders)
      }
      return jsonResponse(
        { error: 'upstream_error', message: 'AskDuart is having trouble thinking right now — try again shortly.' },
        502,
        corsHeaders,
      )
    }
  },
}
