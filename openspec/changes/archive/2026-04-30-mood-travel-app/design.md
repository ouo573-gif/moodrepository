## Context

這是一個全新的 Next.js 專案，從零開始建立。目標是製作可展示的 demo，技術優先考量開發速度與視覺效果。外部依賴包含 Spotify Web API、TMDB API、Claude API（Anthropic SDK）。

## Goals / Non-Goals

**Goals:**

- 完整的搜尋 → 選擇 → 生成 → 展示流程可端到端運作
- Spotify 風格的深色視覺介面
- 行程頁面 UI 具備互動外觀（drag-and-drop 視覺，不需真正重新生成）
- 部署為可公開存取的 demo URL

**Non-Goals:**

- 行程互動不需真正重新呼叫 AI（純前端假互動）
- 不需使用者登入或資料持久化
- 不需支援 Spotify OAuth（使用 Client Credentials Flow 即可）

## Decisions

### Next.js App Router + Tailwind CSS

使用 Next.js 14 App Router 搭配 Tailwind CSS。理由：Spotify API 的 JS SDK 範例最豐富、Server Actions 可直接呼叫 Claude API 避免 key 外洩、Tailwind 能快速實現深色主題。

替代方案：Nuxt（Vue）— 捨棄，因 Spotify 生態在 React 較完整。

### Spotify Client Credentials Flow（非 OAuth）

音樂搜尋只需讀取公開資料（歌名、封面、genre），不需使用者授權。使用 Client Credentials Flow，在 Server Side 取得 access token，避免前端暴露 secret。

替代方案：Spotify OAuth — 捨棄，demo 情境不需個人化資料。

### Claude API 作為情緒分析與行程生成的單一 AI 入口

不分開呼叫兩次 API，而是一次 prompt 同時完成：(1) 解讀情緒氛圍、(2) 生成行程。減少 latency 並讓氛圍描述與行程保持一致。

Prompt 輸入：媒體名稱、genre、描述、mood tag。
輸出格式：JSON，包含 destination、duration、days 陣列。

### 行程展示採用假互動

Demo 階段行程 UI 提供卡片式每日行程，支援拖拉排序（使用 dnd-kit），但不重新呼叫 AI。理由：降低複雜度，視覺效果已足夠展示概念。

## Risks / Trade-offs

- [Spotify API Rate Limit] → 搜尋走 Server Route，加簡單快取（Next.js fetch cache）
- [Claude API 回應格式不穩定] → Prompt 要求嚴格 JSON，加 try-catch fallback 顯示錯誤訊息
- [TMDB / Spotify API Key 管理] → 全部放 `.env.local`，Server Side 呼叫，不外洩前端
