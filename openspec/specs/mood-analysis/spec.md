# mood-analysis Specification

## Purpose

TBD - created by archiving change 'mood-travel-app'. Update Purpose after archive.

## Requirements

### Requirement: Mood extraction from media metadata

The system SHALL extract mood and atmosphere descriptors from the selected media item's metadata (genre, description, mood tags) and pass them to the AI for interpretation.

#### Scenario: Music mood extraction

- **WHEN** user selects a Spotify track
- **THEN** system SHALL include track name, artist, album, and available genre tags in the AI prompt context

#### Scenario: Movie mood extraction

- **WHEN** user selects a TMDB movie
- **THEN** system SHALL include movie title, release year, genre list, and overview in the AI prompt context

---
### Requirement: AI mood interpretation

The system SHALL send media metadata to Claude API and receive a structured mood interpretation before generating the itinerary.

#### Scenario: Mood interpretation included in generation prompt

- **WHEN** system calls Claude API for itinerary generation
- **THEN** the prompt SHALL include a mood/atmosphere description derived from the media metadata

#### Scenario: Single API call for mood and itinerary

- **WHEN** user triggers itinerary generation
- **THEN** system SHALL perform mood analysis and itinerary generation in a single Claude API call to minimize latency
