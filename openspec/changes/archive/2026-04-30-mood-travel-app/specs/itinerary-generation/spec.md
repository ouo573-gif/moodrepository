## ADDED Requirements

### Requirement: Itinerary generation via Claude API

The system SHALL call the Claude API with media metadata and mood context, and receive a structured travel itinerary as JSON output.

#### Scenario: Successful itinerary generation

- **WHEN** user clicks "Generate Itinerary" after selecting a media item
- **THEN** system SHALL call the Claude API and receive a JSON response containing destination, duration, and a day-by-day schedule

#### Scenario: Invalid or unparseable AI response

- **WHEN** Claude API returns a response that cannot be parsed as valid JSON
- **THEN** system SHALL display an error message and allow the user to retry

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

The system SHALL allow Claude to determine the travel destination and number of days/nights based on the media's mood, without the user specifying them manually.

#### Scenario: AI selects destination

- **WHEN** system sends mood context to Claude
- **THEN** Claude SHALL respond with a destination city and country that matches the mood

#### Scenario: AI determines duration

- **WHEN** system sends mood context to Claude
- **THEN** Claude SHALL respond with a days/nights value between 2 and 7 days
