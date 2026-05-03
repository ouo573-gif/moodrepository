import https from 'https'

export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string; width: number; height: number }[]
  }
  genres?: string[]
}

let cachedToken: { token: string; expiresAt: number } | null = null

function httpsRequest(url: string, options: https.RequestOptions, body?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`))
        } else {
          resolve(data)
        }
      })
    })
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token
  }

  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const body = 'grant_type=client_credentials'
  const raw = await httpsRequest('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body)

  const data = JSON.parse(raw)
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 - 60000 }
  return cachedToken.token
}

export async function searchTracks(keyword: string): Promise<SpotifyTrack[]> {
  const token = await getAccessToken()
  const q = encodeURIComponent(keyword)

  const raw = await httpsRequest(
    `https://api.spotify.com/v1/search?q=${q}&type=track&limit=10`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  const data = JSON.parse(raw)
  return data.tracks.items as SpotifyTrack[]
}
