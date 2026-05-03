## MODIFIED Requirements

### Requirement: Music search via Spotify API

The system SHALL allow users to search for music tracks by keyword and display results from the real Spotify Web API (使用 Spotify Client Credentials 而非 OAuth). Movie search is not supported in this version (移除電影搜尋，統一為音樂).

#### Scenario: Successful music search

- **WHEN** user types a keyword in the search bar and submits
- **THEN** system SHALL return up to 12 tracks from Spotify with album cover, track name, and artist name

#### Scenario: No results found

- **WHEN** user submits a search query that returns no Spotify results
- **THEN** system SHALL display a "No results found" message

##### Example: search result card fields

| Field | Source | Example value |
|-------|--------|---------------|
| Cover image | Spotify album.images[0].url | 640x640 JPEG URL |
| Track name | Spotify track.name | "天空之城" |
| Artist | Spotify track.artists[0].name | "久石讓" |
| Album | Spotify track.album.name | "天空之城 オリジナル・サウンドトラック" |

### Requirement: Featured media cards on homepage

The system SHALL display 6 curated featured music cards (music only) on the homepage before the user performs any search.

#### Scenario: Featured music cards shown before search

- **WHEN** user visits the homepage and has not yet performed a search
- **THEN** system SHALL display 6 featured music cards in a grid (no movie cards)

#### Scenario: Featured cards replaced after search

- **WHEN** user submits a search query
- **THEN** system SHALL hide the featured cards and display the search results instead

### Requirement: Media selection

The system SHALL allow users to select exactly one music track to proceed to itinerary generation.

#### Scenario: User selects a track

- **WHEN** user clicks on a track card
- **THEN** system SHALL highlight the selected card and show a fixed CTA button labeled "Plan trip for {title}"

#### Scenario: Only one item selected at a time

- **WHEN** user clicks a different card after already selecting one
- **THEN** system SHALL deselect the previous card and select the new one

## REMOVED Requirements

### Requirement: Movie search via TMDB API

**Reason**: MVP scope is limited to music-to-itinerary flow. Movie search is not part of the core user journey (移除電影搜尋，統一為音樂).
**Migration**: Not applicable — no user data depends on this feature.

#### Scenario: Movie search removed

- **WHEN** user searches for a keyword
- **THEN** system SHALL only return music results; movie results SHALL NOT be shown
