## Why

使用者面對旅遊規劃時常感到無從下手。這個專案以「情緒」為出發點，讓使用者輸入一首歌曲或一部電影，由 AI 解讀其氛圍與情緒，自動生成匹配的旅遊行程，降低旅遊規劃的門檻，同時提供視覺上吸引人的體驗。

## What Changes

- 新增音樂搜尋功能，串接 Spotify Web API，顯示封面、藝人與歌曲資訊
- 新增電影搜尋功能，串接 TMDB API，顯示電影海報與基本資訊
- 新增 AI 情緒分析模組，根據選擇的歌曲/電影的 metadata 解讀情緒氛圍
- 新增行程生成功能，由 Claude AI 產出目的地、天數、每日景點安排
- 新增行程結果展示頁，視覺風格呼應所選音樂/電影，提供可互動的行程 UI
- 全站 UI 中文化：所有介面文字改為繁體中文
- 首頁新增精選卡片區：搜尋前預設顯示音樂精選 3 張、電影精選 3 張，搜尋後切換為搜尋結果

## Non-Goals

- 不實作真正的行程重新生成（互動 UI 為 demo 展示用，拖拉景點不會重新呼叫 AI）
- 不實作使用者帳號與行程儲存功能
- 不支援音訊上傳或音樂播放辨識
- 不串接訂房或機票預訂第三方服務

## Capabilities

### New Capabilities

- `media-search`: 透過關鍵字搜尋音樂（Spotify API）或電影（TMDB API），顯示封面/海報、標題、副資訊
- `mood-analysis`: 根據所選媒體的 metadata（genre、mood tag、描述）由 AI 解讀情緒氛圍
- `itinerary-generation`: 將情緒氛圍輸入 Claude AI，生成目的地推薦與幾天幾夜的每日行程
- `itinerary-display`: 以視覺化方式展示行程，UI 風格呼應所選媒體，提供假互動（拖拉天數/景點）

### Modified Capabilities

（無）

## Impact

- Affected specs: media-search, mood-analysis, itinerary-generation, itinerary-display
- Affected code:
  - New: src/app/page.tsx
  - New: src/app/result/page.tsx
  - New: src/components/MediaSearchBar.tsx
  - New: src/components/MediaCard.tsx
  - New: src/components/ItineraryView.tsx
  - New: src/lib/spotify.ts
  - New: src/lib/tmdb.ts
  - New: src/lib/claude.ts
  - New: src/app/api/search/route.ts
  - New: src/app/api/generate/route.ts
