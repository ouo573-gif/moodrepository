---
name: Neo-Glass Night
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#1a1b20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#c4c6d2'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2f3035'
  outline: '#8e909c'
  outline-variant: '#434651'
  surface-tint: '#b0c6ff'
  primary: '#b0c6ff'
  on-primary: '#002d6e'
  primary-container: '#5475be'
  on-primary-container: '#ffffff'
  inverse-primary: '#3a5ca4'
  secondary: '#bac6e7'
  on-secondary: '#24304a'
  secondary-container: '#3b4662'
  on-secondary-container: '#a9b5d5'
  tertiary: '#ffb694'
  on-tertiary: '#561f00'
  tertiary-container: '#b46035'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001944'
  on-primary-fixed-variant: '#1e448a'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#bac6e7'
  on-secondary-fixed: '#0e1b34'
  on-secondary-fixed-variant: '#3b4662'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#773209'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  stack-gap: 16px
---

## Brand & Style
本設計系統採用 **Neo-Glassmorphism (現代磨砂玻璃風)**，旨在為 MoodVoyage 打造一個充滿現代感、高保真且具備呼吸感的介面。在全新的暗色模式下，核心理念是透過深色層次與透明度來建立引導，模擬深夜中玻璃質感與冷調光影的互動，讓使用者在記錄情緒時感受到私密、純淨且寧靜的氛圍。

此風格鎖定追求生活品質與美感的現代用戶，強調流暢的動態感與視覺深度。介面不再只是工具，而是一個深色的半透明數位容器，承載著用戶的情緒與記憶。

## Colors
色彩配置以深邃的靛藍與暗灰色調為基底，並注入冷調的藍色活力。

- **品牌核心色 (#5475be):** 用於關鍵路徑、主要按鈕 (CTA) 以及狀態指示（如選中、開關打開），在暗色背景中提供溫和而清晰的視覺導向。
- **背景與基調:** 使用大面積的深藍黑色與中性灰，搭配半透明的玻璃層次。
- **透明度策略:** 利用 `glass_dark` 與不同比例的 Backdrop Blur 產生深度。背景應包含柔和的深色漸層，與上層玻璃元件產生物理性的透光互動。

## Typography
字體選用 **Plus Jakarta Sans**，其現代且略帶圓潤的幾何特徵完美契合 Neo-Glassmorphism 的圓角美學。

- **繁體中文呈現:** 在顯示繁體中文時，應確保字距與行高（Line Height）保持寬鬆，避免在暗色玻璃材質上產生視覺擁擠或易讀性下降。
- **階層化佈局:** 標題使用較粗的字重（Bold/ExtraBold）以穿透模糊背景，內文則使用 Regular 或 Medium 確保在不同透明度背景下的易讀性。

## Layout & Spacing
佈局遵循 **Fluid Grid (流動網格)** 邏輯，但在視覺上強調元件的浮動感。

- **律動感:** 間距基數為 8px，但元件之間的邊距（Margins）應保持寬裕，以襯托大型圓角與陰影擴散。
- **分層間距:** 在垂直堆疊的卡片中，利用 16px (md) 的間距維持清晰的節奏感。側邊欄與螢幕邊緣應保留至少 20px 的安全距離。

## Elevation & Depth
深度是本設計系統的核心。層級透過以下三種方式體現：

1.  **Backdrop Blur:** 背景模糊強度應在 `20px` (blur-xl) 到 `40px` (blur-2xl) 之間切換。
2.  **邊框質感:** 每個玻璃元件必須配備 `1px` 的半透明淡色邊框 (`white/10`)，這模擬了玻璃邊緣的微弱折射光，定義了暗色元件的邊界。
3.  **陰影處理:** 使用極度擴散（Blur > 30px）且低不透明度（Opacity < 15%）的冷調陰影，讓元件看起來像是懸浮在深邃環境中。

## Shapes
本設計系統全面採用 **極致圓角** 的語彙。

- **主要容器:** 如大卡片或底層區塊，使用 `24px` 至 `32px` (round-3xl) 的圓角。
- **微型元件:** 如按鈕、標籤或輸入框，使用 `16px` (round-2xl) 或 Pill-shaped (全圓角)。
- **一致性:** 所有邊角必須平滑，維持整體的柔軟感與親和力。

## Components
- **主要按鈕 (Primary Button):** 填充品牌色 #5475be，文字為純白，具備微弱的外發光效果。
- **玻璃卡片 (Glass Cards):** 背景為 `black/20`，具備 `blur-xl` 與細微的淡色邊框。
- **選擇器與標籤 (Chips):** 使用淺色半透明（如 `white/10`）作為非活動狀態，活動狀態切換為品牌藍。
- **導覽列 (Navigation):** 底部導覽列應採用一體化的懸浮玻璃長條，圖標在選中時產生品牌藍的微光呼吸效果。
- **輸入欄位 (Inputs):** 平面的半透明背景，聚焦時邊框色轉為品牌藍。
- **情緒滑桿 (Mood Slider):** 滑桿軌道為細長的半透明線條，拖動手柄為具備強力模糊與品牌色內發光的玻璃圓球。