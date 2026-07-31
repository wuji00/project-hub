# AJW.CN 视觉 DNA

> 目标：把 ajw.cn 的视觉系统拆到可 1:1 复刻的颗粒度。所有数值均来自源码（`ajw-cn-source.html`）+ 浏览器 computed style 实测（视口 1036×647）。

---

## 1. 字体系统

### 1.1 字体栈（核心是系统字体，**无第三方 CDN**）

```css
body font-family:
  -apple-system, BlinkMacSystemFont,
  "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC",
  sans-serif
```

**关键判断**：整个站点**没有用 Google Fonts / 自托管 webfont**。中英文全部走 OS 默认，匹配 `body` 的 `font-family`。这意味着：

- 视觉一致性 = 操作系统的中文系统字体（macOS PingFang / Windows Microsoft YaHei / Linux Noto Sans SC）
- 加载策略 = 纯系统字体，**0 个 FOUT / 0 个字体请求**
- 这是该站能在 24KB HTML 内首屏即出的核心原因

**唯一例外**：

```css
.brand-letters {
  font-family: ui-rounded, "Arial Rounded MT Bold", -apple-system, ...
}
```

LOGO 字母 `A J W` 走 `ui-rounded`（Safari）/ Arial Rounded MT Bold（Win 回退）。**复刻时不要换成 Playfair Display / Lora / EB Garamond** — 这是个中文重站，serif 反而会割裂。

### 1.2 字重梯度

| 元素            | weight | 来源                              |
| --------------- | ------ | --------------------------------- |
| brand (logo)    | 760    | `.brand`                          |
| brand-letters   | 850    | `.brand-letters`                  |
| h1 (hero)       | 800    | `.hero h1`                        |
| h2 (sec-head)   | 800    | `.sec-head h2`                    |
| stat 数字 (b)   | 800    | `.stat b`                         |
| card h3         | 800    | `.card h3`                        |
| btn             | 600    | `.btn`                            |
| pill            | 700 active / 默认未指定 | `.pill[aria-pressed="true"]` |
| nav-links       | 650    | `.nav-links a`                    |
| kind / tag      | 默认   | `font-size` 小，weight 不强调     |

**没有用 100-300 的 light weight** — 这是个全 bold-weight 的"力量型"字体观感。

### 1.3 字号梯度（实测数值，视口 1036px）

| 元素         | 实际计算值 | 声明          |
| ------------ | ---------- | ------------- |
| h1 hero      | 74.6px     | `clamp(44px, 7.2vw, 96px)` |
| h2 section   | 41.4px     | `clamp(28px, 4vw, 44px)` |
| stat b       | 34px       | `font-size:34px` |
| card h3      | 24px       | `.card.span4 h3` |
| card h3 默认 | 20px       | `.card h3` |
| btn          | 14px       | `font-size:14px` |
| lede (副标)  | 16px       | `font-size:16px` |
| eyebrow      | 12px       | `font-size:12px` |
| tag          | 11px       | `font-size:11px` |
| kind         | 12px       | `font-size:12px` |
| mark         | 10px       | `font-size:10px` |
| footer       | 12px       | `font-size:12px` |

**字号阶跃规律**：h1(74) → h2(41) → stat(34) → cardH3(24) → lede(16) → btn(14) → tag(11) → mark(10)

**letter-spacing 规律**：字号越小，letter-spacing 越大（uppercase + tracking 风格）

| 元素        | letter-spacing | 视觉效果               |
| ----------- | -------------- | ---------------------- |
| h1          | -0.01em        | 大字紧凑、咬合          |
| sec h2      | -0.01em        | 同上                   |
| stat span   | 0.22em         | 小标宽间距、uppercase  |
| eyebrow     | 0.34em         | 极宽间距、装饰条        |
| pill        | 0.05em         | 中文友好               |
| mark        | 0.30em         | 小标签宽间距            |
| status      | 0.14em         | 状态徽标               |
| btn         | 0.06em         | 按钮字距               |
| footer      | 0.14em         | 页脚大写宽距            |

### 1.4 行高

| 元素       | line-height   |
| ---------- | ------------- |
| h1         | 1.06          |
| lede       | 1.9（极松）   |
| summary    | 1.75          |
| sec .note  | 1.8           |
| brand      | 1             |

**规律**：中文大段（lede/summary/note）行高 1.75–1.9；西文/数字行高 1.06–1.0。

---

## 2. 配色系统（CSS 变量唯一来源）

```css
:root{
  --bg:#05070f;              /* 主背景：近黑微蓝 */
  --panel:rgba(255,255,255,.045);     /* 卡片底：白 4.5% */
  --panel-strong:rgba(255,255,255,.08); /* 卡片悬停：白 8% */
  --line:rgba(255,255,255,.09);       /* 描边：白 9% */
  --ink:#eef1ff;              /* 主文：近白微蓝 */
  --ink-dim:#9aa3c0;           /* 副文：冷灰 */
  --ink-faint:#5c6480;        /* 三级文：暗灰 */
  --coral:#ff6b5e;            /* 品牌强调 1：珊瑚红 */
  --gold:#f5c445;             /* 品牌强调 2：金 */
  --cyan:#4dd8e6;             /* 品牌强调 3：青 */
  --violet:#a78bfa;           /* 品牌强调 4：紫 */
  --lime:#a8e063;             /* 项目色：柠绿 */
  --orange:#ff9f45;           /* 项目色：橙 */
  --blue:#6aa8ff;             /* 项目色：蓝 */
}
```

### 2.1 颜色用法矩阵

| 角色          | 变量 / 值             | 用在哪                                |
| ------------- | --------------------- | ------------------------------------- |
| 背景          | `--bg #05070f`        | body、aurora 容器之外的所有底          |
| 主文字        | `--ink #eef1ff`       | h1、h2、h3、nav                       |
| 副文          | `--ink-dim #9aa3c0`   | lede、summary、tag                    |
| 三级文 / 注脚 | `--ink-faint #5c6480` | stat span、note、kind、footer         |
| 卡片底        | `--panel` (白 4.5%)   | .card、.pills、.search、.stats         |
| 卡片描边      | `--line` (白 9%)      | 所有边框                              |
| 强调 / CTA    | `linear-gradient(100deg, cyan, violet)` | 主按钮、active pill    |
| H1 高亮词     | `linear-gradient(100deg, cyan 0%, violet 45%, coral 100%)` | "一束光" |
| 状态-在线     | `#57e88b` 绿          | .status.online .dot（带 pulse）       |
| 状态-开发中   | `--gold #f5c445` 金    | .status.building .dot                 |
| 状态-在建     | `--orange #ff9f45` 橙 | .status.building（developing=true）   |
| 链接-项目强调 | 各自 `--acc` 变量     | 卡片左色条、open 按钮底色              |
| 选区          | `background:violet, color:#05070f` | ::selection            |

### 2.2 状态色精确值

```css
.status.online .dot  { background:#57e88b; box-shadow:0 0 8px #57e88b; animation:pulse 2.4s infinite }
.status.building .dot{ background:var(--gold); box-shadow:0 0 8px var(--gold) }
```

**复刻时**：不要把"在线"做成蓝色、把"开发中"做成红色。这是绿+金的克制组合。

### 2.3 渐变系统

| 用途               | 渐变                                                       |
| ------------------ | ---------------------------------------------------------- |
| H1 高亮 `.glow`    | `linear-gradient(100deg, #4dd8e6 0%, #a78bfa 45%, #ff6b5e 100%)` + `drop-shadow(0 0 26px rgba(120,110,255,.35))` |
| 主按钮             | `linear-gradient(100deg, #4dd8e6, #a78bfa)` + `box-shadow: 0 8px 30px rgba(110,130,255,.35)` |
| 主按钮 hover       | `box-shadow: 0 12px 40px rgba(110,130,255,.55)` + `translateY(-2px)` |
| Logo orb           | `conic-gradient(from 120deg, cyan, violet, coral, gold, cyan)` + 双层 box-shadow 18px cyan + 28px violet |
| Eyebrow 前横线     | `linear-gradient(90deg, var(--cyan), transparent)`         |
| stat 数字 b        | `linear-gradient(180deg, #fff, #9aa3c0)` 文字渐变          |
| 卡片 .art 底遮罩   | `linear-gradient(180deg, transparent 40%, rgba(5,7,15,.85) 100%)` |
| 卡片 .art hover    | `img scale(1.05)` + 卡片 translateY(-5px) + `--acc` 描边   |
| Sky blob 1         | `radial-gradient(circle, #3b2d8f, transparent 65%)` 紫     |
| Sky blob 2         | `radial-gradient(circle, #0e5a66, transparent 65%)` 青     |
| Sky blob 3         | `radial-gradient(circle, #6d2a5e, transparent 65%)` 粉紫   |

**核心配色逻辑**：

- **背景**：深黑微蓝
- **前景**：白文字 + 3 级灰阶（dim / faint）
- **强调**：5 色品牌色（coral / gold / cyan / violet / blue + lime + orange）
- **状态**：绿=健康，金=开发中
- **氛围**：aurora 3 blob（紫+青+粉紫）blur 90px 漂浮

---

## 3. 间距系统

### 3.1 容器

```css
.wrap { max-width:1240px; margin:0 auto; padding:0 28px }
.nav-in { max-width:1240px; padding:0 28px; height:62px }
.foot-in { max-width:1240px; padding:0 28px }
```

- **统一容器宽 1240px**，左右内边距 28px（移动端 16px）
- 复刻时**不要用 1200px 或 1280px** — 1240 是这个站的"签名"

### 3.2 Section 间距

| 元素                  | padding / margin                              |
| --------------------- | --------------------------------------------- |
| `.hero`               | `padding: 96px 0 72px` （移动 60 0 48）       |
| `.sec-head`           | `margin: 40px 0 28px`                         |
| `.controls`           | `margin-bottom: 30px`                         |
| `.grid`               | `gap: 18px; padding-bottom: 20px`             |
| `footer`              | `margin-top: 70px; padding: 34px 0`           |

### 3.3 卡片内部

| 元素              | 值                              |
| ----------------- | ------------------------------- |
| .card border-radius | `22px`                        |
| .card .art        | `aspect-ratio: 16/8.5`（span4 是 16/9） |
| .card .body       | `padding: 20px 22px 22px; gap:12px` |
| .actions          | `padding-top: 8px; border-top: 1px solid var(--line)` |
| .actions a        | `padding: 11px 0; border-radius: 12px` |
| .tag              | `padding: 5px 11px; border-radius: 999px` |
| .status           | `padding: 6px 12px; border-radius: 999px` |
| .btn              | `padding: 14px 26px; border-radius: 999px` |
| .pill             | `padding: 8px 18px`              |
| .search input     | `padding: 13px 18px 13px 44px; border-radius: 999px` |

### 3.4 Stats 卡片

```css
.stats { max-width:560px; border-radius:20px; padding:0 }
.stat  { padding:22px 24px; flex:1 }
.stat b  { font-size:34px }
.stat span{ font-size:11px; letter-spacing:.22em }
```

3 列 flex，1px 垂直分割线（`border-right:1px solid var(--line)`），整组 1px 外描边 + 20px 圆角 + backdrop-blur 14px。

---

## 4. 对齐方式

| 区块             | 对齐                            |
| ---------------- | ------------------------------- |
| nav              | 两端对齐：logo 在左，链接在右    |
| hero 标题        | **左对齐**（不是居中）          |
| hero stats       | 左对齐（max-width: 560px）       |
| sec-head         | 两端对齐：h2 在左，note 在右    |
| controls         | 左对齐：pills + search 横向     |
| 卡片网格         | 左对齐 bento grid               |
| footer           | 两端对齐：左 logo 行，右日期   |
| 卡片内部        | 左对齐                          |

**核心：全站左对齐**。即便 hero 用很大字号也没有 `text-align: center`。这是这个站的"刻意不平庸"。

---

## 5. 图形与装饰元素

### 5.1 Aurora 背景（sky 层）

```css
.sky{position:fixed;inset:0;z-index:-2;pointer-events:none}
.sky .blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5}
```

3 个 blob，blur 90px，opacity 0.5，26-38s ease-in-out infinite alternate。

- blob1：紫 `#3b2d8f`，左上，56vw
- blob2：青 `#0e5a66`，右上，44vw
- blob3：粉紫 `#6d2a5e`，左中下，40vw

外加一层 1px 圆点网格（120px×120px 间距，白 0.5px 不透明，opacity 0.06）。

**复刻时这个层必不可少** — 它是站点"科技感"的核心来源。

### 5.2 Logo orb

```css
.brand .orb {
  background: conic-gradient(from 120deg, var(--cyan), var(--violet), var(--coral), var(--gold), var(--cyan));
  box-shadow: 0 0 18px rgba(77,216,230,.72), 0 0 28px rgba(167,139,250,.42);
  animation: logo-orb-loop 7.2s ease-in-out infinite
}
```

22×22 圆，`conic-gradient` 5 色 + 双层 box-shadow 发光 + 7.2s 循环动效。

### 5.3 Eyebrow 前装饰横线

```css
.hero .eyebrow::before {
  content:""; width:34px; height:1px;
  background: linear-gradient(90deg, var(--cyan), transparent)
}
```

34px 渐变横线，cyan 渐到透明。**这个细节决定了"高定感"**。

### 5.4 状态点 pulse

```css
.status.online .dot { animation: pulse 2.4s infinite }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
```

在线=脉冲呼吸，开发中=静态。

### 5.5 卡片 hover

```css
.card {
  transition: transform .3s, border-color .3s, box-shadow .3s;
}
.card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--acc) 55%, transparent);
  box-shadow: 0 20px 60px -20px color-mix(in srgb, var(--acc) 45%, transparent);
}
.card .art img { transition: transform .6s cubic-bezier(.2,.7,.2,1) }
.card:hover .art img { transform: scale(1.05) }
```

`color-mix()` 是关键 — 卡片描边和阴影颜色由 `--acc` 变量决定（每个项目自己定义）。

### 5.6 选区色

```css
::selection { background: var(--violet); color: #05070f }
```

### 5.7 焦点环

```css
a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

## 6. 复刻时的"签名级"细节（少了就不像）

1. **容器宽 1240px** + **左右 padding 28px**（不是 1200/24/32）
2. **H1 字号 `clamp(44px, 7.2vw, 96px)`** + line-height 1.06 + letter-spacing -0.01em
3. **H1 渐变三段**：cyan → violet → coral（角度 100deg）+ drop-shadow 26px 紫
4. **Aurora 3 blob** + 1px 圆点网格（120px 间距，opacity 0.06）
5. **eyebrow 前渐变横线 34px**（cyan → transparent）
6. **Logo 双层 conic-gradient + 双层 box-shadow 发光 + 7.2s 循环**
7. **stat 数字 `linear-gradient(180deg, #fff, #9aa3c0)`** 文字渐变
8. **状态点绿=在线 pulse、金=开发中**，不是常见蓝/红
9. **卡片 hover `color-mix(in srgb, var(--acc) 45%, transparent)`** 描边和阴影
10. **aurora 配色用 #3b2d8f / #0e5a66 / #6d2a5e** 这三个具体的紫/青/粉紫（不是泛指"蓝紫"）
11. **无任何第三方 webfont** — 全部系统字体
12. **导航 backdrop-filter blur(18px) + rgba(5,7,15,.55) 背景**
13. **search input 左侧 16px 处放放大镜 SVG（stroke #9aa3c0 2px）**
14. **卡片 body gap 12px、padding 20 22 22**

---

## 7. 响应式断点

```css
@media (max-width: 960px) {
  .card.span4, .card.span3, .card.span2 { grid-column: span 6 }  /* 单列 */
  .card .art { aspect-ratio: 16/9 }
}
@media (max-width: 640px) {
  .hero { padding: 60px 0 48px }
  .stats { flex-direction: column }
  .stat  { border-right: none; border-bottom: 1px solid var(--line) }
  .nav-links { display: none }  /* 移动端只留 logo + 不显示 nav */
}
```

两个断点：**960px 和 640px**。没有 768。复刻时不要用常见的三断点。
