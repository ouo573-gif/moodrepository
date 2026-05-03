## ADDED Requirements

### Requirement: Music search via Spotify API

The system SHALL allow users to search for music tracks by keyword and display results from the Spotify Web API.

#### Scenario: Successful music search

- **WHEN** user types a keyword in the search bar and selects "Music" mode
- **THEN** system SHALL display a list of matching tracks with album cover, track name, artist name, and album name

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

### Requirement: Movie search via TMDB API

The system SHALL allow users to search for movies by keyword and display results from the TMDB API.

#### Scenario: Successful movie search

- **WHEN** user types a keyword in the search bar and selects "Movie" mode
- **THEN** system SHALL display a list of matching movies with poster, title, release year, and genre list

#### Scenario: Missing poster

- **WHEN** a TMDB result has no poster_path
- **THEN** system SHALL display a placeholder image instead of a broken image

### Requirement: Featured media cards on homepage

The system SHALL display curated featured media cards on the homepage before the user performs any search, so users can start without typing.

#### Scenario: Featured cards shown before search

- **WHEN** user visits the homepage and has not yet performed a search
- **THEN** system SHALL display 3 featured music cards and 3 featured movie cards in separate labeled sections

#### Scenario: Featured cards replaced after search

- **WHEN** user submits a search query
- **THEN** system SHALL hide the featured cards section and display the search results instead

##### Example: featured section layout

| Section label | Cards shown | Count |
|--------------|-------------|-------|
| 🎵 音樂精選 | Hardcoded music items | 3 |
| 🎬 電影精選 | Hardcoded movie items | 3 |

### Requirement: Media selection

The system SHALL allow users to select exactly one media item from the search results to proceed to itinerary generation.

#### Scenario: User selects a media item

- **WHEN** user clicks on a search result card
- **THEN** system SHALL highlight the selected card and enable the "Generate Itinerary" button

#### Scenario: Only one item selected at a time

- **WHEN** user clicks a different card after already selecting one
- **THEN** system SHALL deselect the previous card and select the new one
