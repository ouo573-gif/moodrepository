## Why

目前 `/api/search` 與 `/api/generate` 兩個後端路由使用假資料（mock），無法展示真實功能。需要接通 Spotify Web API 與 Gemini AI，讓使用者輸入真實 Spotify 歌曲後，由 AI 生成對應的旅行行程。

## What Changes

- `/api/search` 改為呼叫真實 Spotify Web API（Client Credentials flow），回傳真實歌曲搜尋結果
- `/api/generate` 改為呼叫真實 Gemini 1.5 Flash API，根據歌曲資訊與使用者設定的目的地/天數生成行程
- 首頁移除電影相關內容（Featured Items 中的電影、MOCK_MOVIES）
- 首頁移除心情滑桿 section（資料未被使用）
- 新增 `.env.local.example` 說明所需環境變數

## Non-Goals

- 不實作 Spotify OAuth（使用者登入）；只用 Client Credentials 取得搜尋能力
- 不修改 UI 視覺樣式（保留 Neo-Glassmorphism 設計）
- 不實作搜尋結果快取或分頁
- 不修改行程頁（`/result`）或行程列表頁（`/trips`）的 UI

## Capabilities

### New Capabilities

- `spotify-search`: 透過 Spotify Web API 搜尋音樂曲目，回傳標準化 MediaItem 格式

### Modified Capabilities

- `itinerary-generation`: 從 mock 改為真實 Gemini API 呼叫，並加入 destination、days 參數傳遞
- `media-search`: 搜尋範圍限縮為僅音樂（移除電影），資料來源從 mock 改為真實 Spotify API

## Impact

- Affected specs: `spotify-search` (new), `media-search` (modified), `itinerary-generation` (modified)
- Affected code:
  - Modified: `app/src/app/api/search/route.ts`
  - Modified: `app/src/app/api/generate/route.ts`
  - Modified: `app/src/app/page.tsx`
  - Modified: `app/src/lib/claude.ts`
  - New: `app/.env.local.example`
