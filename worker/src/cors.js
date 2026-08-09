export function getAllowedOrigin(request, env) {
  const origin = request.headers.get('Origin')
  if (!origin) return null

  const allowList = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  return allowList.includes(origin) ? origin : null
}

export function buildCorsHeaders(origin) {
  if (!origin) return {}

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}
