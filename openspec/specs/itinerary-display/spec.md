# itinerary-display Specification

## Purpose

TBD - created by archiving change 'mood-travel-app'. Update Purpose after archive.

## Requirements

### Requirement: Day-by-day itinerary card layout

The system SHALL display the generated itinerary as a series of day cards, each showing the day number, title, and a list of activities with time, place, and description.

#### Scenario: Itinerary rendered after generation

- **WHEN** Claude API returns a valid itinerary JSON
- **THEN** system SHALL render one card per day, each card containing morning/afternoon/evening activity slots

#### Scenario: Destination and duration header

- **WHEN** itinerary page loads
- **THEN** system SHALL display the destination name, country, and total days/nights prominently at the top of the page

---
### Requirement: Visual theme matching selected media

The system SHALL apply a visual style to the itinerary page that echoes the mood and aesthetic of the selected music or movie.

#### Scenario: Color palette derived from album/poster art

- **WHEN** itinerary page loads
- **THEN** system SHALL use the dominant color extracted from the media cover/poster as the page accent color

#### Scenario: Selected media displayed on result page

- **WHEN** itinerary page loads
- **THEN** system SHALL display the selected track/movie cover image alongside the itinerary

---
### Requirement: Demo drag-and-drop interaction

The system SHALL provide drag-and-drop UI for reordering day cards and activity items within a day, as a visual demo without re-calling the AI.

#### Scenario: User drags a day card

- **WHEN** user drags a day card to a new position
- **THEN** system SHALL reorder the cards visually without triggering an API call

#### Scenario: User drags an activity within a day

- **WHEN** user drags an activity item within a day card
- **THEN** system SHALL reorder the activities visually within that day card

---
### Requirement: Loading state during generation

The system SHALL display a loading indicator while the Claude API call is in progress.

#### Scenario: Loading state shown

- **WHEN** user clicks "Generate Itinerary" and the API call is pending
- **THEN** system SHALL display an animated loading state and disable the generate button to prevent duplicate submissions

---
### Requirement: Traditional Chinese UI language

The system SHALL display all interface labels, buttons, placeholders, and navigation text in Traditional Chinese (繁體中文).

#### Scenario: Homepage UI in Chinese

- **WHEN** user visits the homepage
- **THEN** all UI text SHALL be in Traditional Chinese, including mode toggle buttons (音樂/電影), search button (搜尋), subtitle, and generate button

#### Scenario: Result page UI in Chinese

- **WHEN** user views the itinerary result page
- **THEN** all UI labels SHALL be in Traditional Chinese, including back button (返回), section labels (AI 旅遊行程, 靈感來源), duration format (N 天 · N 夜), and day card labels (第 N 天)

##### Example: key UI string mappings

| Component | English (original) | Traditional Chinese |
|-----------|-------------------|---------------------|
| Mode toggle | Music / Movie | 音樂 / 電影 |
| Search button | Search | 搜尋 |
| Generate button | Generate Itinerary for "X" | 為「X」規劃行程 |
| Back button | ← Back | ← 返回 |
| Duration badge | N Days · N Nights | N 天 · N 夜 |
| Day label | Day N | 第 N 天 |
