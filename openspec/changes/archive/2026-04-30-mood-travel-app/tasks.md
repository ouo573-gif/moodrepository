## 1. 專案初始化（Next.js App Router + Tailwind CSS）

- [x] 1.1 使用 `create-next-app` 建立 Next.js 14 專案，啟用 App Router、TypeScript、Tailwind CSS — 對應設計決策 Next.js App Router + Tailwind CSS
- [x] 1.2 安裝依賴：`@anthropic-ai/sdk`、`dnd-kit`（拖拉互動）、`colorthief`（封面取色）
- [x] 1.3 設定 `.env.local`，加入 `SPOTIFY_CLIENT_ID`、`SPOTIFY_CLIENT_SECRET`、`TMDB_API_KEY`、`ANTHROPIC_API_KEY`

## 2. Spotify API 整合（Music search via Spotify API）

- [x] 2.1 建立 `src/lib/spotify.ts`：實作 Spotify Client Credentials Flow（非 OAuth）取得 access token，並提供 `searchTracks(keyword)` 函式，對應 Music search via Spotify API
- [x] 2.2 建立 `src/app/api/search/route.ts`（music mode）：Server Side 代理 Spotify 搜尋，避免 secret 外洩前端

## 3. TMDB API 整合（Movie search via TMDB API）

- [x] 3.1 建立 `src/lib/tmdb.ts`：實作 `searchMovies(keyword)` 函式，回傳 title、poster_path、release_year、genres，對應 Movie search via TMDB API
- [x] 3.2 建立 `src/app/api/search/route.ts`（movie mode）：接受 `?q=<keyword>&type=music|movie`，統一格式回傳結果

## 4. 搜尋 UI

- [x] 4.1 建立 `src/components/MediaSearchBar.tsx`：含關鍵字輸入欄、music/movie 模式切換按鈕、送出觸發搜尋
- [x] 4.2 建立 `src/components/MediaCard.tsx`：顯示封面/海報、標題、副標（藝人或年份）、選取高亮狀態；TMDB 缺少海報時（Missing poster）顯示 placeholder 圖片
- [x] 4.3 建立 `src/app/page.tsx`：整合 MediaSearchBar 與結果 MediaCard 列表，深色 Spotify 風格背景

## 5. 媒體選取（Media selection）

- [x] 5.1 在 `src/app/page.tsx` 實作 Media selection 單選邏輯：點擊 MediaCard 設定選取狀態，再點其他卡片自動取消前一個（Only one item selected at a time）
- [x] 5.2 選取後顯示「Generate Itinerary」按鈕，未選取時按鈕為 disabled 狀態

## 6. AI 情緒分析與行程生成（Claude API 作為情緒分析與行程生成的單一 AI 入口）

- [x] 6.1 建立 `src/lib/claude.ts`：實作 Mood extraction from media metadata — 組裝含媒體名稱、genre、描述的 prompt context
- [x] 6.2 在 `src/lib/claude.ts` 實作 AI mood interpretation：將情緒 context 送入 Claude API，單一呼叫完成情緒解讀與行程生成（Claude API 作為情緒分析與行程生成的單一 AI 入口）
- [x] 6.3 建立 `src/app/api/generate/route.ts`：接收媒體資料，呼叫 `claude.ts`，實作 Itinerary generation via Claude API；捕捉 JSON parse 錯誤（Invalid or unparseable AI response）回傳 400
- [x] 6.4 Prompt 設計：要求 Claude 決定目的地城市與天數（2–7 天），Destination and duration determined by AI，輸出嚴格 JSON schema

## 7. 行程展示頁（Day-by-day itinerary card layout）

- [x] 7.1 建立 `src/app/result/page.tsx`：從 localStorage 讀取行程 JSON，顯示 Destination and duration header（目的地城市、國家、天數夜數）
- [x] 7.2 實作 `src/components/ItineraryView.tsx`：Day-by-day itinerary card layout，每卡顯示 day 標題與早/午/晚活動列表

## 8. 視覺主題（Visual theme matching selected media）

- [x] 8.1 使用 `colorthief` 從封面/海報取出主色，套用為頁面 accent color — Visual theme matching selected media（Color palette derived from album/poster art）
- [x] 8.2 在 result 頁頂部顯示選取的媒體封面/海報（Selected media displayed on result page）

## 9. 拖拉互動（Demo drag-and-drop interaction、行程展示採用假互動）

- [x] 9.1 使用 `dnd-kit` 實作 Demo drag-and-drop interaction — 日卡片拖拉排序（User drags a day card），純前端狀態更新，行程展示採用假互動不觸發 API
- [x] 9.2 實作單日內活動拖拉排序（User drags an activity within a day）

## 10. 載入狀態（Loading state during generation）

- [x] 10.1 點擊「Generate Itinerary」後顯示 loading spinner，Loading state during generation — disable 按鈕防止重複送出（Loading state shown）
- [x] 10.2 API 回應後自動跳轉至 result 頁，或顯示錯誤提示並恢復按鈕

## 11. UI 中文化（Traditional Chinese UI language）

- [x] 11.1 實作 Traditional Chinese UI language — 中文化 `src/components/MediaSearchBar.tsx`：音樂/電影切換按鈕、搜尋 placeholder、搜尋按鈕改為繁體中文
- [x] 11.2 中文化 `src/app/page.tsx`：副標題、搜尋結果標籤、生成按鈕文字（為「X」規劃行程）、行程生成中
- [x] 11.3 中文化 `src/app/result/page.tsx`：返回按鈕、AI 旅遊行程、天數夜數格式（N 天 · N 夜）、靈感來源
- [x] 11.4 中文化 `src/components/ItineraryView.tsx`：第 N 天、拖拉提示

## 12. 首頁精選卡片區（Featured media cards on homepage）

- [x] 12.1 實作 Featured media cards on homepage — 在 `src/app/page.tsx` 新增 `searched` 狀態，控制顯示精選區或搜尋結果
- [x] 12.2 hardcode 音樂精選 3 筆（FEATURED_MUSIC）、電影精選 3 筆（FEATURED_MOVIES）於 `src/app/page.tsx` 前端
- [x] 12.3 搜尋前顯示「🎵 音樂精選」與「🎬 電影精選」兩個 3 欄卡片區；搜尋後隱藏精選、顯示搜尋結果
- [x] 12.4 精選卡片與搜尋結果共用 MediaCard 元件與單選邏輯
