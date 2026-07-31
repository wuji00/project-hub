# AJW.CN 技术栈拆解

> 直接来自 `view-source` + 浏览器 computed style 验证。所有外部依赖 = 0。

---

## 1. HTML / CSS / JS 总量

| 资源       | 体积          | 来源       |
| ---------- | ------------- | ---------- |
| HTML+CSS+JS 总和 | 24,448 bytes (~24 KB) | 单文件，gzip 前 |
| HTML 框架  | 无（vanilla） | —          |
| CSS 框架   | 无（vanilla） | 所有 CSS 内联在 `<style>` |
| JS 框架    | 无（vanilla） | 60 行原生 JS |
| 外部 JS    | 0 个          | 0 个 `<script src>` |
| 外部 CSS   | 0 个          | 0 个 `<link rel=stylesheet>` |
| Webfont    | 0 个          | 全部系统字体 |
| 图片       | 8 张 PNG（封面图） | 本地 `assets/*.png` |
| 图标       | 1 SVG（favicon） | 本地 `favicon.svg` |

**结论**：这是一个**单文件静态站点**，24KB 包含完整设计、完整交互、完整内容。可以塞进一个 `index.html` 离线打开。

---

## 2. HTML 骨架（去掉敏感内容，保留结构）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ai匠坞 · AJW.CN Project Hub</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="canonical" href="https://www.ajw.cn/">
  <style>...</style>
</head>
<body>

  <!-- Aurora 背景层（fixed, z=-2, pointer-events:none） -->
  <div class="sky" aria-hidden="true">
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>
  </div>

  <!-- 导航（sticky, backdrop-blur 18px） -->
  <nav>
    <div class="nav-in">
      <a class="brand" href="#" aria-label="...">
        <span class="brand-mark" aria-hidden="true">
          <span class="orb"></span>
          <span class="brand-letters">
            <span class="brand-letter logo-a">A</span>
            <span class="brand-letter logo-j">J</span>
            <span class="brand-letter logo-w">W</span>
            <span class="brand-letter logo-domain">.CN</span>
          </span>
        </span>
        <span class="brand-name">Ai匠坞</span>
        <small>/ AJW.CN PROJECT HUB</small>
      </a>
      <div class="nav-links">
        <a href="#projects">项目索引</a>
        <a href="https://github.com/rsagacom" target="_blank" rel="noopener">GitHub ↗</a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <header class="hero wrap">
    <div class="eyebrow">Ai匠坞 · AJW.CN Project Hub · 2026</div>
    <h1>每个想法，<br>都有<span class="glow">一束光</span>的入口。</h1>
    <p class="lede">从语音冒险到宠物翻译...</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#projects">探索项目 ↓</a>
      <a class="btn btn-ghost" href="https://github.com/rsagacom" target="_blank" rel="noopener">GitHub 组织 ↗</a>
    </div>
    <div class="stats" role="list">
      <div class="stat" role="listitem"><b>06</b><span>在线 Online</span></div>
      <div class="stat" role="listitem"><b>03</b><span>开发中 Building</span></div>
      <div class="stat" role="listitem"><b>08</b><span>项目 Projects</span></div>
    </div>
  </header>

  <!-- 项目区 -->
  <main class="wrap" id="projects">
    <div class="sec-head">
      <h2>项目索引</h2>
      <p class="note">"在线"为最近一次公网复核记录...</p>
    </div>
    <div class="controls" role="group" aria-label="项目筛选与搜索">
      <div class="pills" role="group" aria-label="按状态筛选">
        <button class="pill" data-filter="all" aria-pressed="true">全部<em>08</em></button>
        <button class="pill" data-filter="online" aria-pressed="false">在线<em>06</em></button>
        <button class="pill" data-filter="building" aria-pressed="false">开发中<em>03</em></button>
      </div>
      <div class="search">
        <svg width="16" height="16" viewBox="0 0 24 24" ...>...</svg>
        <input type="search" id="q" placeholder="...">
      </div>
    </div>
    <div class="grid" id="grid"></div>           <!-- 卡片由 JS 注入 -->
    <div class="empty" id="empty">...</div>      <!-- 空状态 -->
  </main>

  <!-- Footer -->
  <footer>
    <div class="foot-in">
      <span>Ai匠坞 / AJW.CN PROJECT HUB · AURORA</span>
      <span>产品入口与公开源码状态复核 · 2026-07-31</span>
    </div>
  </footer>

  <script>
    const PROJECTS = [ ... 8 项硬编码 ... ];
    // 筛选 + 搜索 + 渲染
  </script>
</body>
</html>
```

### 关键 div class 清单

| class         | 作用                            |
| ------------- | ------------------------------- |
| `.sky`        | aurora 背景层（fixed, z:-2）    |
| `.blob.b1/b2/b3` | 3 个发光圆球（filter:blur 90px） |
| `.nav`        | 粘性导航                       |
| `.nav-in`     | 导航内层（max-width 1240）      |
| `.brand`      | logo + 文字                     |
| `.brand-mark` | 80×26 logo 容器                 |
| `.orb`        | 22×22 conic-gradient 圆球       |
| `.brand-letters` | A J W .CN 字母组              |
| `.hero`       | 首屏容器                       |
| `.eyebrow`    | 上眉小标 + 渐变横线             |
| `.glow`       | H1 高亮渐变文字                 |
| `.lede`       | 副标段落                       |
| `.cta-row`    | 按钮行                         |
| `.btn.btn-primary` | 主按钮                     |
| `.btn.btn-ghost`   | 幽灵按钮                   |
| `.stats`      | 3 列数字指标组                  |
| `.stat`       | 单个数字单元格                  |
| `.sec-head`   | section 标题行                  |
| `.controls`   | 筛选 + 搜索行                  |
| `.pills`      | 筛选按钮组                      |
| `.pill`       | 单个筛选按钮                    |
| `.search`     | 搜索框容器                      |
| `.grid`       | bento 6 列网格                  |
| `.card.span{2,3,4}` | 卡片（跨 N 列）             |
| `.card .art`  | 卡片封面图区                    |
| `.statuses`   | 卡片右上状态徽标组              |
| `.status.online` / `.status.building` | 状态徽标     |
| `.dot`        | 状态点                         |
| `.body`       | 卡片正文区                      |
| `.mark`       | 卡片顶部小标                    |
| `.kind`       | 卡片小标灰色                    |
| `.summary`    | 卡片正文段落                    |
| `.tags` / `.tag` | 功能标签                     |
| `.actions`    | 按钮行（打开 + 源码）           |
| `.actions a.open` | 主操作按钮                |
| `.actions a.repo` | 源码链接                   |
| `.actions span.na` | 不可用占位                |
| `.empty`      | 空状态                         |
| `.foot-in`    | 页脚内层                        |

---

## 3. 关键 CSS（按区块，已脱敏）

### 3.1 颜色变量

```css
:root {
  --bg: #05070f;
  --panel: rgba(255,255,255,.045);
  --panel-strong: rgba(255,255,255,.08);
  --line: rgba(255,255,255,.09);
  --ink: #eef1ff;
  --ink-dim: #9aa3c0;
  --ink-faint: #5c6480;
  --coral: #ff6b5e;  --gold: #f5c445;  --cyan: #4dd8e6;  --violet: #a78bfa;
  --lime: #a8e063;   --orange: #ff9f45; --blue: #6aa8ff;
}
```

### 3.2 Aurora 背景

```css
.sky { position: fixed; inset: 0; z-index: -2; overflow: hidden; pointer-events: none; }
.sky .blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .5; }
.blob.b1 { width: 56vw; height: 56vw; left: -14vw; top: -22vw;
  background: radial-gradient(circle, #3b2d8f 0%, transparent 65%);
  animation: drift1 26s ease-in-out infinite alternate; }
.blob.b2 { width: 44vw; height: 44vw; right: -12vw; top: -8vw;
  background: radial-gradient(circle, #0e5a66 0%, transparent 65%);
  animation: drift2 32s ease-in-out infinite alternate; }
.blob.b3 { width: 40vw; height: 40vw; left: 22vw; bottom: -26vw;
  background: radial-gradient(circle, #6d2a5e 0%, transparent 65%);
  animation: drift3 38s ease-in-out infinite alternate; }
@keyframes drift1 { to { transform: translate(9vw, 7vh) scale(1.12) } }
@keyframes drift2 { to { transform: translate(-8vw, 10vh) scale(.9) } }
@keyframes drift3 { to { transform: translate(6vw, -8vh) scale(1.08) } }
.sky::after {
  content: ""; position: absolute; inset: 0;
  background-image: radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px);
  background-size: 120px 120px; opacity: .06;
}
```

### 3.3 Logo

```css
.brand { display: flex; align-items: center; gap: 10px; font-weight: 760; letter-spacing: .1em;
  font-size: 18px; line-height: 1; text-decoration: none; color: var(--ink); white-space: nowrap; }
.brand-mark { position: relative; width: 80px; height: 26px; flex: 0 0 80px; overflow: hidden; }
.brand .orb {
  position: absolute; right: 0; top: 2px; width: 22px; height: 22px; border-radius: 50%;
  background: conic-gradient(from 120deg, var(--cyan), var(--violet), var(--coral), var(--gold), var(--cyan));
  box-shadow: 0 0 18px rgba(77,216,230,.72), 0 0 28px rgba(167,139,250,.42);
  animation: logo-orb-loop 7.2s ease-in-out infinite;
}
.brand-letters {
  position: absolute; inset: 0;
  font-family: ui-rounded, "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px; font-weight: 850; letter-spacing: .045em; line-height: 26px;
  color: #f7f8ff; text-shadow: 0 0 14px rgba(77,216,230,.28);
}
.brand-letter {
  position: absolute; opacity: 0; transform: translateX(24px) scale(.82); filter: blur(3px);
  animation-duration: 7.2s; animation-timing-function: cubic-bezier(.2,.9,.25,1.16);
  animation-iteration-count: infinite;
}
.logo-a      { left: 0;   animation-name: logo-a-loop }
.logo-j      { left: 19px; animation-name: logo-j-loop }
.logo-w      { left: 35px; animation-name: logo-w-loop }
.logo-domain { left: 54px; font-size: 11px; font-weight: 780; letter-spacing: .04em;
               animation-name: logo-domain-loop }
```

### 3.4 Hero

```css
.hero { padding: 96px 0 72px; position: relative; }
.hero .eyebrow {
  font-size: 12px; letter-spacing: .34em; color: var(--cyan); text-transform: uppercase;
  margin-bottom: 26px; display: flex; align-items: center; gap: 12px;
}
.hero .eyebrow::before {
  content: ""; width: 34px; height: 1px;
  background: linear-gradient(90deg, var(--cyan), transparent);
}
.hero h1 {
  font-size: clamp(44px, 7.2vw, 96px); line-height: 1.06;
  font-weight: 800; letter-spacing: -.01em; max-width: 14ch;
}
.hero h1 .glow {
  background: linear-gradient(100deg, var(--cyan) 0%, var(--violet) 45%, var(--coral) 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 26px rgba(120,110,255,.35));
}
.hero p.lede {
  margin-top: 26px; max-width: 46ch;
  color: var(--ink-dim); font-size: 16px; line-height: 1.9;
}
.cta-row { margin-top: 38px; display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px; border-radius: 999px;
  font-size: 14px; font-weight: 600; text-decoration: none; letter-spacing: .06em;
  transition: transform .2s, box-shadow .2s; border: 1px solid transparent;
}
.btn-primary {
  background: linear-gradient(100deg, var(--cyan), var(--violet)); color: #05070f;
  box-shadow: 0 8px 30px rgba(110,130,255,.35);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(110,130,255,.55); }
.btn-ghost { border-color: var(--line); color: var(--ink); background: var(--panel); }
.btn-ghost:hover { transform: translateY(-2px); background: var(--panel-strong); }
```

### 3.5 Stats

```css
.stats {
  margin-top: 64px; display: flex; gap: 0;
  border: 1px solid var(--line); border-radius: 20px; overflow: hidden;
  background: var(--panel); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  max-width: 560px;
}
.stat { flex: 1; padding: 22px 24px; border-right: 1px solid var(--line); }
.stat:last-child { border-right: none; }
.stat b {
  display: block; font-size: 34px; font-weight: 800; letter-spacing: -.02em;
  background: linear-gradient(180deg, #fff, #9aa3c0);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.stat span { font-size: 11px; letter-spacing: .22em; color: var(--ink-faint); text-transform: uppercase; }
```

### 3.6 筛选 + 搜索

```css
.controls { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; margin-bottom: 30px; }
.pills {
  display: flex; gap: 8px;
  background: var(--panel); border: 1px solid var(--line);
  border-radius: 999px; padding: 5px; backdrop-filter: blur(10px);
}
.pill {
  border: none; background: transparent; color: var(--ink-dim);
  font-size: 13px; padding: 8px 18px; border-radius: 999px;
  cursor: pointer; letter-spacing: .05em; transition: all .2s;
}
.pill:hover { color: var(--ink); }
.pill[aria-pressed="true"] {
  background: linear-gradient(100deg, var(--cyan), var(--violet));
  color: #05070f; font-weight: 700;
}
.pill em { font-style: normal; opacity: .75; margin-left: 5px; font-size: 11px; }
.search { flex: 1; min-width: 220px; position: relative; }
.search input {
  width: 100%; padding: 13px 18px 13px 44px; border-radius: 999px;
  border: 1px solid var(--line); background: var(--panel);
  color: var(--ink); font-size: 14px; backdrop-filter: blur(10px);
  transition: border-color .2s;
}
.search input::placeholder { color: var(--ink-faint); }
.search input:focus {
  border-color: var(--cyan); outline: none;
  box-shadow: 0 0 0 3px rgba(77,216,230,.15);
}
.search svg { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); opacity: .5; }
```

### 3.7 Bento Grid + Card

```css
.grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; padding-bottom: 20px; }
.card {
  position: relative; border-radius: 22px; border: 1px solid var(--line);
  background: var(--panel); overflow: hidden; display: flex; flex-direction: column;
  transition: transform .3s, border-color .3s, box-shadow .3s;
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
}
.card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--acc) 55%, transparent);
  box-shadow: 0 20px 60px -20px color-mix(in srgb, var(--acc) 45%, transparent);
}
.card.span3 { grid-column: span 3 }
.card.span4 { grid-column: span 4 }
.card.span2 { grid-column: span 2 }
.card .art { position: relative; aspect-ratio: 16/8.5; overflow: hidden; }
.card.span4 .art { aspect-ratio: 16/9; }
.card .art img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .6s cubic-bezier(.2,.7,.2,1);
}
.card:hover .art img { transform: scale(1.05); }
.card .art::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(5,7,15,.85) 100%);
}
.statuses { position: absolute; top: 14px; right: 14px; z-index: 2;
  display: flex; align-items: center; gap: 7px; flex-wrap: wrap; justify-content: flex-end; }
.status {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 11px; letter-spacing: .14em; padding: 6px 12px; border-radius: 999px;
  background: rgba(5,7,15,.55); border: 1px solid var(--line); backdrop-filter: blur(8px);
}
.status .dot { width: 7px; height: 7px; border-radius: 50%; }
.status.online .dot { background: #57e88b; box-shadow: 0 0 8px #57e88b; animation: pulse 2.4s infinite; }
.status.building .dot { background: var(--gold); box-shadow: 0 0 8px var(--gold); }
@keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
.card .body { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 12px; flex: 1; }
.card .mark { font-size: 10px; letter-spacing: .3em; color: var(--acc); font-weight: 700; }
.card h3 { font-size: 20px; font-weight: 800; }
.card.span4 h3 { font-size: 24px; }
.card .kind { color: var(--ink-faint); font-size: 12px; letter-spacing: .08em; }
.card .summary { color: var(--ink-dim); font-size: 13.5px; line-height: 1.75; }
.tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: auto; padding-top: 4px; }
.tag {
  font-size: 11px; padding: 5px 11px; border-radius: 999px;
  border: 1px solid var(--line); color: var(--ink-dim); background: rgba(255,255,255,.03);
}
.actions { display: flex; gap: 10px; padding-top: 8px; border-top: 1px solid var(--line); }
.actions a, .actions span.na {
  flex: 1; text-align: center; font-size: 13px; font-weight: 600;
  padding: 11px 0; border-radius: 12px; text-decoration: none;
  letter-spacing: .05em; transition: all .2s;
}
.actions a.open { background: color-mix(in srgb, var(--acc) 88%, #000); color: #05070f; }
.actions a.open:hover { filter: brightness(1.12); }
.actions a.repo { border: 1px solid var(--line); color: var(--ink); }
.actions a.repo:hover { background: var(--panel-strong); }
.actions span.na { color: var(--ink-faint); border: 1px dashed var(--line); font-weight: 400; cursor: not-allowed; }
.empty {
  display: none; text-align: center; padding: 80px 20px;
  color: var(--ink-faint); border: 1px dashed var(--line);
  border-radius: 22px; font-size: 14px; letter-spacing: .06em;
}
```

### 3.8 响应式

```css
@media (max-width: 960px) {
  .card.span4, .card.span3, .card.span2 { grid-column: span 6 }
  .card .art { aspect-ratio: 16/9 }
}
@media (max-width: 640px) {
  .hero { padding: 60px 0 48px }
  .stats { flex-direction: column }
  .stat  { border-right: none; border-bottom: 1px solid var(--line) }
  .stat:last-child { border-bottom: none }
  .nav-in { padding: 0 16px }
  .nav-links { display: none }
  .brand { gap: 8px; font-size: 17px; letter-spacing: .08em }
}
```

---

## 4. JS 逻辑（约 60 行）

```js
const PROJECTS = [
  // 8 项硬编码项目对象
  { id, name, english, kind, url, repo, status, developing, mark, accent, art, span, alt, summary, functions }
];

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const q = document.getElementById("q");
let filter = "all";

function render() {
  const term = q.value.trim().toLowerCase();
  const list = PROJECTS.filter(p => {
    const okF = filter === "all" || p.status === filter || (filter === "building" && p.developing);
    const hay = (p.name + p.english + p.kind + p.summary + p.functions.join(" ")).toLowerCase();
    return okF && (!term || hay.includes(term));
  });
  empty.style.display = list.length ? "none" : "block";
  grid.innerHTML = list.map(p => `
    <article class="card span${p.span}" style="--acc:${p.accent}">
      <div class="art">
        <img src="${p.art}" alt="${p.alt}" loading="lazy">
        <div class="statuses">
          <span class="status ${p.status}"><span class="dot"></span>${p.status === "online" ? "在线" : "开发中"}</span>
          ${p.developing ? `<span class="status building"><span class="dot"></span>开发中</span>` : ""}
        </div>
      </div>
      <div class="body">
        <span class="mark">${p.mark} / ${p.english}</span>
        <h3>${p.name}</h3>
        <span class="kind">${p.kind}</span>
        <p class="summary">${p.summary}</p>
        <div class="tags">${p.functions.map(f => `<span class="tag">${f}</span>`).join("")}</div>
        <div class="actions">
          ${p.url && !p.hideProductLink ? `<a class="open" href="${p.url}" target="_blank" rel="noopener">打开产品 ↗</a>` : (p.status === "building" ? `<span class="na">开发中 · 暂无入口</span>` : "")}
          ${p.repo ? `<a class="repo" href="${p.repo}" target="_blank" rel="noopener">开源地址 ↗</a>` : `<span class="na">源码暂未公开</span>`}
        </div>
      </div>
    </article>`).join("");
}

document.querySelectorAll(".pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    filter = btn.dataset.filter;
    render();
  });
});
q.addEventListener("input", render);
render();
```

**安全注意**：源码里 `p.url / p.repo / p.name` 等被模板字符串直接插入 HTML（无转义）。因为是硬编码数据，没有 XSS 风险。**但如果复刻时引入用户输入 / API 数据，必须用 `textContent` 或 escape**。

---

## 5. 复刻时的栈选择建议

| 原站                | 推荐复刻栈（如果改）                                   |
| ------------------- | ------------------------------------------------------ |
| 纯 HTML + CSS + JS  | **保持纯静态**（最大优势 = 极快、零依赖、好部署）      |
| 无 CDN、无构建       | 不引入 webpack/vite，直接编辑 HTML                     |
| 8 个项目硬编码      | 如果变多，可改 `PROJECTS` 为 `fetch('./projects.json')` 异步加载，但增加复杂度 |
| 无 webfont          | **保留这个决定**，不要加 Google Fonts                    |
| 无图片优化          | 复刻时可升级到 `<picture>` + WebP/AVIF                  |
| 无 PWA / manifest   | 复刻可加 manifest + service worker（offline）           |
| 无 analytics        | 复刻可加 Plausible / umami（隐私友好）                  |
| 无 SEO meta         | 原站只有 `<title>` + canonical，**建议复刻补充**：og: / twitter: card / description / keywords |

---

## 6. 浏览器兼容性

源码使用的现代特性：

- `clamp()` — 2020+ 全面支持（IE 不支持）
- `color-mix(in srgb, ...)` — 2023+ 支持（Chrome 111+, Firefox 113+, Safari 16.2+）
- `aspect-ratio` — 2021+ 全面支持
- `backdrop-filter` — 2020+ 全面支持（Firefox 103+）
- `conic-gradient` — 2020+ 全面支持
- CSS custom properties — 全面支持
- `gap` for flex/grid — 全面支持

**唯一可能踩坑**：`color-mix` 较新。如果需要兼容老浏览器，需要 fallback（用固定 rgba）。但**复刻建议坚持原栈**。

---

## 7. 性能特征

- **首次绘制**：HTML 24KB 一次性下载，无外部请求 → 极快
- **LCP（最大内容绘制）**：H1 在视口内（无图）→ 应该是 first-paint 即出
- **CLS（布局偏移）**：所有尺寸明确（aspect-ratio、clamp）→ 几乎为 0
- **FID / INP**：JS 极小 + 无第三方 → 接近 0
- **总请求数**：1 HTML + 1 SVG favicon + 8 张 PNG = 10 个
- **gzip 后体积**：HTML ~6KB + 8 张图（每张 50-300KB）

如果复刻想进一步提升：

1. 图片转 WebP（体积 -30%）
2. 图片用 `<picture>` 配合 `srcset`（按视口分发）
3. 卡片图加 `decoding="async"`
4. 关键 H1 字体（如果加 webfont）用 `font-display: swap`
