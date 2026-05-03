## ADDED Requirements

### Requirement: Authenticate with Spotify using Client Credentials

The system SHALL obtain a Spotify API access token using the Client Credentials flow with `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` from environment variables. The token SHALL be cached until expiry to avoid redundant requests.

#### Scenario: Token obtained and cached

- **WHEN** a search request arrives and no valid cached token exists
- **THEN** system SHALL POST to `https://accounts.spotify.com/api/token` and cache the token until expiry minus 60 seconds

#### Scenario: Cached token reused

- **WHEN** a search request arrives and a valid cached token exists
- **THEN** system SHALL reuse the cached token without making a new token request

#### Scenario: Missing credentials

- **WHEN** `SPOTIFY_CLIENT_ID` or `SPOTIFY_CLIENT_SECRET` is not set
- **THEN** system SHALL fall back to returning mock music data and include `"source": "mock"` in the response

### Requirement: Search Spotify tracks by keyword

The system SHALL search the Spotify `/v1/search` endpoint with `type=track&limit=12` and return results mapped to the `MediaItem` format.

#### Scenario: Successful track search

- **WHEN** user submits a keyword search
- **THEN** system SHALL return up to 12 tracks with `id`, `title` (track name), `subtitle` (artist name), `coverUrl` (album image URL), `genres` (empty array, Spotify tracks do not expose genre at track level), and `type: "music"`

#### Scenario: Spotify API failure

- **WHEN** Spotify search endpoint returns a non-2xx status
- **THEN** system SHALL fall back to returning mock music data and include `"source": "mock"` in the response

##### Example: MediaItem mapping from Spotify track

| Spotify field | MediaItem field | Example value |
|---|---|---|
| track.id | id | "4iV5W9uYEdYUVa79Axb7Rh" |
| track.name | title | "Shape of You" |
| track.artists[0].name | subtitle | "Ed Sheeran" |
| track.album.images[0].url | coverUrl | "https://i.scdn.co/image/..." |
| [] | genres | [] |
| "music" | type | "music" |
