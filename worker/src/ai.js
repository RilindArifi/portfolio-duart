import { SYSTEM_PROMPT } from './context.js'

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast'

const JSON_INSTRUCTIONS = `Respond with ONLY a single JSON object, no markdown code fences, no extra text, matching exactly this shape:
{"reply": "your answer as a string", "suggestions": ["follow-up 1", "follow-up 2", "follow-up 3"]}
"suggestions" must have 2-3 short follow-up questions a visitor might naturally ask next.`

export async function askAssistant({ message, history, env }) {
  const messages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\n${JSON_INSTRUCTIONS}` },
    ...history.map((turn) => ({
      role: turn.role === 'assistant' ? 'assistant' : 'user',
      content: turn.text,
    })),
    { role: 'user', content: message },
  ]

  let result
  try {
    result = await env.AI.run(MODEL, {
      messages,
      max_tokens: 400,
      temperature: 0.6,
    })
  } catch (err) {
    console.error('Workers AI request error', err)
    throw new UpstreamError()
  }

  try {
    const parsed = parseAiResult(result)

    if (typeof parsed.reply !== 'string' || !Array.isArray(parsed.suggestions)) {
      throw new Error('malformed shape')
    }

    return {
      reply: parsed.reply,
      suggestions: parsed.suggestions.filter((s) => typeof s === 'string').slice(0, 3),
    }
  } catch (err) {
    console.error('Workers AI response parse error', err, JSON.stringify(result))
    throw new UpstreamError()
  }
}

function parseAiResult(result) {
  // `response` can already be a parsed object (some models auto-parse JSON
  // output), a JSON string, or absent — fall back to the raw chat-completion
  // message content in that case.
  if (result?.response && typeof result.response === 'object') {
    return result.response
  }

  const raw =
    typeof result?.response === 'string'
      ? result.response
      : (result?.choices?.[0]?.message?.content ?? '')

  return JSON.parse(extractJson(raw))
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (fenced) return fenced[1]

  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1)
  }

  return text
}

export class UpstreamError extends Error {
  constructor() {
    super('AskDuart is having trouble thinking right now — try again shortly.')
  }
}
