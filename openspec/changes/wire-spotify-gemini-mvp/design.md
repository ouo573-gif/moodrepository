## Context

目前 MoodTravel app 的搜尋與行程生成功能完全依賴 mock 資料。`lib/spotify.ts` 和 `lib/claude.ts`（Gemini）的實作已存在但未被路由呼叫。搜尋路由 `/api/search` 直接回傳 `MOCK_MUSIC` 陣列；生成路由 `/api/generate` 回傳固定的 `MOCK_ITINERARY` 並加上 1.2 秒的假延遲。

## Goals / Non-Goals

**Goals:**
- 接通 Spotify Client Credentials flow，讓搜尋回傳真實結果
- 接通 Gemini 1.5 Flash，讓行程生成反映真實歌曲的氛圍
- 將使用者輸入的 destination 和 days 傳入 Gemini prompt
- 移除首頁非核心 UI（電影 items、心情滑桿）

**Non-Goals:**
- 不實作 Spotify 使用者授權（OAuth PKCE）
- 不修改 UI 視覺樣式
- 不加入搜尋快取、分頁或速率限制

## Decisions

### 使用 Spotify Client Credentials 而非 OAuth

Spotify Client Credentials flow 只需 `client_id` + `client_secret`，可以在 Next.js API route（伺服器端）安全使用，不需要使用者登入。搜尋曲目不需要存取使用者資料，Client Credentials 已足夠。`lib/spotify.ts` 的 `getAccessToken()` 已實作此 flow，只需在 route 中呼叫。

### Gemini prompt 加入 destination 和 days 參數

現有 `buildPrompt()` 讓 Gemini 自行決定目的地與天數。更新後的版本應傳入使用者指定的 `destination` 和 `days`，讓 Gemini 在指定框架內生成行程，而非完全自由發揮。這使生成結果與使用者輸入一致。

函式簽名改為：`generateItinerary(media: MediaItem, destination: string, days: number): Promise<Itinerary>`

### 移除電影搜尋，統一為音樂

MVP 核心流程是「Spotify 歌曲 → AI 旅程」。電影 mock 資料和 `type=movie` 的搜尋支援增加複雜度但不提供核心價值。`MediaItem.type` 欄位保留（型別定義不動），但前端不再顯示或搜尋電影。

## Risks / Trade-offs

- [Spotify API 金鑰未設定] → 路由應優雅降回 mock 資料，而非拋出 500 錯誤，並在 response 加上 `source: "mock"` 標記
- [Gemini API 金鑰未設定] → 同上，降回 mock 行程並標記
- [Gemini 回傳非 JSON 或格式不符] → `lib/claude.ts` 已有 regex 抽取 JSON，但需確認 schema 欄位完整性驗證
