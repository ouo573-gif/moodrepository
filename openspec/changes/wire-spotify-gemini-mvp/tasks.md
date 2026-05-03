## 1. 環境設定

- [x] 1.1 建立 `app/.env.local.example`，列出 `SPOTIFY_CLIENT_ID`、`SPOTIFY_CLIENT_SECRET`、`GEMINI_API_KEY` 三個必要變數及說明

## 2. Spotify 搜尋接線（使用 Spotify Client Credentials 而非 OAuth）

- [x] 2.1 [P] 修改 `app/src/app/api/search/route.ts`：移除所有 mock 資料（`MOCK_MUSIC`、`MOCK_MOVIES`），改呼叫 `lib/spotify.ts` 的 `searchTracks(keyword)` 取得 `SpotifyTrack[]`（Authenticate with Spotify using Client Credentials）
- [x] 2.2 [P] 在 `/api/search` route 中將 `SpotifyTrack` 轉換為 `MediaItem`：`id=track.id`、`type="music"`、`title=track.name`、`subtitle=track.artists[0].name`、`coverUrl=track.album.images[0]?.url ?? null`、`genres=[]`、`description=track.album.name`、`year=""`（Music search via Spotify API）
- [x] 2.3 在 `/api/search` route 加入 fallback：若 `SPOTIFY_CLIENT_ID` 未設定或 Spotify API 呼叫失敗，回傳 mock 資料並在 response 加入 `"source": "mock"` 欄位（Search Spotify tracks by keyword）

## 3. Gemini 行程生成接線（Gemini prompt 加入 destination 和 days 參數）

- [x] 3.1 修改 `app/src/lib/claude.ts`：更新 `buildPrompt()` 函式簽名加入 `destination: string, days: number`，在 prompt 中加入「Destination: {destination}, Number of days: {days}」的約束（Destination and duration determined by AI）
- [x] 3.2 更新 `app/src/lib/claude.ts`：更新 `generateItinerary()` 函式簽名為 `generateItinerary(media: MediaItem, destination: string, days: number): Promise<Itinerary>`
- [x] 3.3 修改 `app/src/app/api/generate/route.ts`：從 request body 解構 `{ media, destination, days }`，移除固定 1.2 秒 delay 和 `MOCK_ITINERARY`，改呼叫 `generateItinerary(media, destination, days)`（Itinerary generation via Claude API）
- [x] 3.4 在 `/api/generate` route 加入 fallback：若 `GEMINI_API_KEY` 未設定或 Gemini 回傳無效 JSON，回傳 mock 行程並在 response 加入 `"source": "mock"` 欄位（Missing Gemini API key）

## 4. 前端 MVP 精簡（移除電影搜尋，統一為音樂）

- [x] 4.1 修改 `app/src/app/page.tsx`：移除 `FEATURED_ITEMS` 中所有 `type: "movie"` 的 items，只保留 6 個音樂 items（Featured media cards on homepage）
- [x] 4.2 修改 `app/src/app/page.tsx`：確認搜尋呼叫只傳 `type=music`，移除電影搜尋分支（Movie search via TMDB API）
- [x] 4.3 修改 `app/src/app/page.tsx`：移除心情滑桿 section（`moodValue` state、range input 及「Generate Mood Station」按鈕），確保 Media selection 流程不受影響（Media selection）
- [x] 4.4 修改 `app/src/app/api/search/route.ts`：移除 `MOCK_MOVIES` 陣列及 `type === 'movie'` 條件分支（Movie search via TMDB API）

## 5. 驗證

- [x] 5.1 在 `app/.env.local` 填入真實 Spotify 和 Gemini 金鑰，執行 `npm run dev`，在搜尋欄輸入歌曲名稱確認回傳真實 Spotify 結果（Music search via Spotify API）
- [x] 5.2 選擇一首歌曲後進入 `/mood`，設定目的地和天數，點擊生成，確認行程的天數和目的地與設定一致（Itinerary generation via Claude API）
- [x] 5.3 移除 `.env.local` 中的 API 金鑰，確認搜尋和生成都能 fallback 回 mock 資料，不拋出 500 錯誤（Authenticate with Spotify using Client Credentials）
