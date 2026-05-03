## MODIFIED Requirements

### Requirement: Itinerary generation via Claude API

The system SHALL call the Gemini 1.5 Flash API (replacing Claude) with media metadata, user-specified destination, and number of days, and receive a structured travel itinerary as JSON output.

#### Scenario: Successful itinerary generation

- **WHEN** user clicks "Generate Itinerary" after selecting a music track and setting destination and days
- **THEN** system SHALL call the Gemini API and receive a JSON response containing destination, duration, and a day-by-day schedule matching the user's specified destination and days

#### Scenario: Invalid or unparseable AI response

- **WHEN** Gemini API returns a response that cannot be parsed as valid JSON
- **THEN** system SHALL display an error message and allow the user to retry

##### Example: invalid AI response behavior

| AI output | System behavior |
|---|---|
| `{ "destination": "Paris" }` (missing days array) | display error message, show retry button |
| `Here is your trip to Paris...` (plain text, no JSON) | display error message, show retry button |
| Valid JSON matching schema | display itinerary on result page |

#### Scenario: Missing Gemini API key

- **WHEN** `GEMINI_API_KEY` environment variable is not set
- **THEN** system SHALL fall back to returning mock itinerary data

##### Example: itinerary JSON structure

```json
{
  "destination": "京都",
  "country": "日本",
  "duration": { "days": 3, "nights": 2 },
  "mood": "寧靜、懷舊、略帶憂鬱",
  "days": [
    {
      "day": 1,
      "title": "抵達與沉澱",
      "activities": [
        { "time": "上午", "place": "嵐山竹林", "description": "在晨光中漫步" },
        { "time": "下午", "place": "天龍寺", "description": "枯山水庭園靜思" },
        { "time": "晚上", "place": "先斗町", "description": "傳統町家晚餐" }
      ]
    }
  ]
}
```

### Requirement: Destination and duration determined by AI

The system SHALL use the destination city and number of days provided by the user on the mood setup page, passing them into the Gemini prompt (gemini prompt 加入 destination 和 days 參數). The AI SHALL generate activities for the specified destination within the specified number of days. This replaces the previous behavior where AI freely chose destination and duration.

#### Scenario: User specifies destination and days

- **WHEN** user sets destination to "Paris" and days to 4 on the mood setup page and clicks "Generate Itinerary"
- **THEN** system SHALL pass destination="Paris" and days=4 to the Gemini API and the returned itinerary SHALL have exactly 4 day entries for Paris

#### Scenario: AI generates activities within user constraints

- **WHEN** system sends the prompt with user-specified destination and days
- **THEN** Gemini SHALL return an itinerary with exactly the specified number of day objects, each with 3 activities (morning, afternoon, evening)

##### Example: user input to Gemini prompt mapping

| User input | Prompt variable | Example |
|---|---|---|
| Destination field | destination | "Paris, France" |
| Days stepper | days | 4 |
| Selected track name | media.title | "La Vie en Rose" |
| Selected track artist | media.subtitle | "Édith Piaf" |
