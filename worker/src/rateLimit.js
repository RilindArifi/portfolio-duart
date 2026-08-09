// KV writes are eventually consistent, so concurrent requests within the same
// second can under-count by a request or two. Acceptable at personal-portfolio
// traffic levels; a Durable Object would fix it exactly but isn't worth the
// added complexity here.
export async function checkRateLimit(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const windowSeconds = parseInt(env.RATE_LIMIT_WINDOW_SECONDS, 10) || 3600
  const max = parseInt(env.RATE_LIMIT_MAX, 10) || 18

  const bucket = Math.floor(Date.now() / 1000 / windowSeconds)
  const key = `rl:${ip}:${bucket}`

  const current = parseInt(await env.RATE_LIMIT_KV.get(key), 10) || 0

  if (current >= max) {
    const secondsIntoWindow = Math.floor(Date.now() / 1000) - bucket * windowSeconds
    const retryAfter = windowSeconds - secondsIntoWindow
    return { limited: true, retryAfter }
  }

  await env.RATE_LIMIT_KV.put(key, String(current + 1), {
    expirationTtl: windowSeconds + 60,
  })

  return { limited: false }
}
