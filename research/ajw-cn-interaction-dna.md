# AJW.CN 交互 DNA

> 目标：把 ajw.cn 的所有交互行为（滚动、筛选、悬停、动效、加载）拆到可 1:1 复刻的颗粒度。

---

## 1. 滚动行为

### 1.1 平滑滚动

```css
html { scroll-behavior: smooth }
```

锚点跳转（nav 上的"项目索引"、hero 按钮"探索项目"）走浏览器原生平滑滚动。

### 1.2 prefers-reduced-motion 兼容

```css
@media (prefers-reduced-motion: reduce) {
  .blob { animation: none }
  html  { scroll-behavior: auto }
  .brand .orb { display: none }
  .brand-letter { opacity: 1; transform: none; filter: none; animation: none }
  .status.online .dot { animation: none }
  .card .art img { transition: none }
}
```

**关键**：尊重 `prefers-reduced-motion`，所有循环动画 + 平滑滚动都禁用。复刻时**必须保留**这个 media query。

### 1.3 滚动条

源码无自定义滚动条样式，使用浏览器默认。在深色背景下默认滚动条会显得"灰条" — 这是个**复刻时的可优化点**，但原站没做。

---

## 2. 筛选器交互

### 2.1 状态结构

```html
<div class="pills">
  <button class="pill" data-filter="all" aria-pressed="true">全部<em>08</em></button>
  <button class="pill" data-filter="online" aria-pressed="false">在线<em>06</em></button>
  <button class="pill" data-filter="building" aria-pressed="false">开发中<em>03</em></button>
</div>
```

3 个 pill 单选（互斥），用 `aria-pressed` 标记当前态。每个 pill 后面带 `<em>` 数字（计数）。

### 2.2 视觉态

| 状态        | 样式                                                              |
| ----------- | ----------------------------------------------------------------- |
| 默认        | 透明背景、`color: var(--ink-dim)`                                 |
| hover       | `color: var(--ink)`、0.2s 过渡                                     |
| active 态   | `background: linear-gradient(100deg, cyan, violet)`、`color:#05070f`、`font-weight:700` |

**active 渐变方向和 H1 渐变、H1 高亮完全一致**（cyan → violet 100deg），形成视觉呼应。

### 2.3 过渡动画

```css
.pill { transition: all .2s }
```

只有颜色和字重的 0.2s 缓动，**没有 transform 缩放**。克制。

### 2.4 切换逻辑（JS）

```js
document.querySelectorAll(".pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    filter = btn.dataset.filter;
    render();
  });
});
```

- 同步切换所有 pill 的 `aria-pressed`
- 全局变量 `filter` 更新
- 立即重渲染 `#grid` 整个 DOM（**没有动画**，直接 innerHTML 重写）

### 2.5 搜索交互

```js
q.addEventListener("input", render);
```

- 每次 `input` 事件都重渲染
- 没有 debounce（**潜在性能问题，但符合"实时反馈"设计意图**）
- 搜索范围：项目名 + 英文名 + kind + summary + functions（所有拼成大字符串）
- 大小写不敏感（`.toLowerCase()`）

### 2.6 筛选 + 搜索复合逻辑

```js
const okF = filter === "all" || p.status === filter || (filter === "building" && p.developing);
```

注意 `building` 状态会同时匹配 `p.status === "building"` 和 `p.developing === true` 的项目（如 goudaner-world 的 status=online 但 developing=true）。这是隐藏的"在建设中"独立维度。

### 2.7 空状态

```html
<div class="empty" id="empty">没有找到匹配的项目 —— 换个关键词，或清除筛选试试。</div>
```

```css
.empty {
  display: none;
  text-align: center;
  padding: 80px 20px;
  color: var(--ink-faint);
  border: 1px dashed var(--line);
  border-radius: 22px;
  font-size: 14px;
  letter-spacing: .06em;
}
```

只有当 `list.length === 0` 时才 `display: block`。**虚线 1px 描边**的圆角矩形，居中提示文字。

---

## 3. 卡片悬停

### 3.1 卡片整体

```css
.card {
  transition: transform .3s, border-color .3s, box-shadow .3s;
}
.card:hover {
  transform: translateY(-5px);
  border-color: color-mix(in srgb, var(--acc) 55%, transparent);
  box-shadow: 0 20px 60px -20px color-mix(in srgb, var(--acc) 45%, transparent);
}
```

- **上浮 5px**（不是常见的 2-4px）
- **描边变成项目强调色 55% 不透明**
- **阴影 60px 大模糊 + 20px 投影，颜色 = 项目强调色 45% 不透明**
- 三属性同时过渡 0.3s

### 3.2 卡片封面图

```css
.card .art img {
  transition: transform .6s cubic-bezier(.2,.7,.2,1);
}
.card:hover .art img { transform: scale(1.05) }
```

`scale(1.05)` + 0.6s 自定义贝塞尔（不是 ease-out 标准）。这个贝塞尔曲线 `(0.2, 0.7, 0.2, 1)` 是"快出慢入"的爆发感。

### 3.3 按钮 hover

```css
.btn { transition: transform .2s, box-shadow .2s }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(110,130,255,.55) }
.btn-ghost:hover { transform: translateY(-2px); background: var(--panel-strong) }
```

**主按钮**上浮 2px + 阴影变深变大；**ghost 按钮**只上浮 2px + 背景从 4.5% 白升到 8% 白。

### 3.4 打开产品按钮

```css
.actions a.open { background: color-mix(in srgb, var(--acc) 88%, #000); color: #05070f }
.actions a.open:hover { filter: brightness(1.12) }
```

按钮底色 = 项目强调色 88% + 黑 12% 混合（**降低饱和度的实用做法**）。hover 时 `brightness(1.12)` 加亮，**不是再变色**。

### 3.5 链接 hover

```css
.nav-links a { color: var(--ink); font-weight: 650; transition: color .2s }
.nav-links a:hover, .nav-links a:focus-visible { color: var(--ink) }  /* 故意同色 */
```

**nav 链接 hover 不变色** — 已经是最亮文字。复刻时这是个"反常识"细节。

---

## 4. Hero 文字动画

### 4.1 静态入场

源码**没有** hero 文字的逐字渐入 / 滑入动画。H1 静态出现。

- 没有 IntersectionObserver
- 没有 `animation-delay`
- 没有 `transform: translateY` 入场

**这是个克制的设计选择** — 视觉重心交给 aurora 背景 + 静态大字。如果复刻想加入场，可以加 `opacity 0 → 1` 200ms 即可，但不要做"逐字 reveal"那种花哨的。

### 4.2 滚动时表现

- 导航 `position: sticky` 一直吸顶
- H1 在视口外时无副作用
- 没有任何 scroll-linked 动画（如 parallax、scroll-spy 进度条）

---

## 5. 数字指标动效

### 5.1 静态数字

```html
<div class="stat"><b>06</b><span>在线 Online</span></div>
```

**没有 count-up 动画**。数字 `06 / 03 / 08` 直接静态显示。

如果复刻想加，可以加 1s 缓动从 0 涨到目标值，但**原站没做**。

### 5.2 状态点脉冲

```css
.status.online .dot {
  background: #57e88b;
  box-shadow: 0 0 8px #57e88b;
  animation: pulse 2.4s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
```

7×7 圆点，绿 + 8px 绿光 + 2.4s 呼吸。这是全站**唯一的循环微动效**（除 aurora 和 logo 外）。

---

## 6. Logo 动画（站点的"签名"动效）

### 6.1 Orb（圆球）

```css
@keyframes logo-orb-loop {
  0%, 34%   { opacity: 1; transform: translateY(0) scale(1); filter: saturate(1) }
  16%       { transform: translateY(-1px) scale(1.08); filter: saturate(1.25) }
  45%, 79%  { opacity: 0; transform: translateX(15px) scale(.28); filter: blur(2px) }
  90%       { opacity: 1; transform: translateX(0) scale(1.08); filter: saturate(1.25) }
  100%      { opacity: 1; transform: translateY(0) scale(1); filter: saturate(1) }
}
```

7.2s 循环。orb 周期性"飞走 + 淡出 + 缩成小球 + 飞回 + 缩放爆发"。

### 6.2 字母逐个进入

每个字母（a / j / w / .cn）独立 animation，依次延迟：

- a: `0%–35%` 隐藏 → `43%–73%` 显示 → `82%–100%` 隐藏
- j: `0%–39%` 隐藏 → `47%–73%` 显示 → `82%–100%` 隐藏
- w: `0%–43%` 隐藏 → `51%–73%` 显示 → `82%–100%` 隐藏
- .cn: `0%–47%` 隐藏 → `55%–73%` 显示 → `82%–100%` 隐藏

**4% 的间隔差**实现"逐个弹出"效果，配合 7.2s 主循环。这是"看似简单实际精心编排"的动效。

### 6.3 贝塞尔曲线

```css
animation-timing-function: cubic-bezier(.2, .9, .25, 1.16)
```

`(0.2, 0.9, 0.25, 1.16)` — y 值 1.16 让元素有"轻微回弹"的弹性感（不是标准 ease-out）。

---

## 7. 加载策略

### 7.1 字体加载

```css
font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB",
             "Microsoft YaHei", "Noto Sans SC", sans-serif;
```

**0 个 webfont 请求** — 全部走 OS 默认字体。FOIT/FOUT = 0。

### 7.2 图片加载

```html
<img src="${p.art}" alt="${p.alt}" loading="lazy">
```

- 卡片封面图全部 `loading="lazy"`
- 没有 `<picture>`、没有 srcset、没有现代格式（全部是 png）
- 资源路径：`assets/voice-realm.png` 等，本地相对路径

### 7.3 favicon

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml">
```

用 SVG favicon。

### 7.4 关键渲染路径

- HTML 24KB（gzip 前），所有 CSS 全部内联（`<style>` 在 head），无外部 CSS 文件
- 0 个外部 JS（JS 也内联在 body 末尾）
- 0 个 webfont 请求
- 浏览器拿到 HTML 即可直接绘制首屏
- 真正的"零依赖"

### 7.5 JS 执行

```js
const PROJECTS = [ ... 8 项硬编码 ... ];
```

- 8 个项目**硬编码在 HTML 里的 JS 数组**
- 没有 fetch / no API
- 没有框架（无 React/Vue）
- 纯 vanilla DOM 操作
- 总 JS 量：~60 行

---

## 8. 交互"签名级"细节（少了就不像）

1. **卡片 hover translateY(-5px) + 0.6s 自定义贝塞尔图片缩放 1.05**
2. **卡片描边和阴影用 `color-mix(in srgb, var(--acc) 45%, transparent)` 由项目强调色派生**
3. **筛选 pill active 用 cyan→violet 渐变**（和 H1 高亮、主按钮同款渐变）
4. **状态点绿=在线 pulse、金=开发中**，不蓝不红
5. **导航链接 hover 不变色**（已经最亮）
6. **logo orb + 字母的 7.2s 循环动画**（圆球飞走、字母逐个进出）
7. **筛选切换是直接 innerHTML 重写**（没有过渡动画）
8. **搜索无 debounce**（input 即渲染）
9. **空状态用 1px dashed 圆角矩形 + 居中提示**
10. **滚动是浏览器原生 smooth**，没有自定义 scroll-jacking
11. **prefers-reduced-motion 完整处理**：aurora / logo / status pulse / 卡片过渡 / 平滑滚动全部禁用
12. **focus-visible 用 cyan 2px 描边 + 3px offset**（键盘可访问性）

---

## 9. 复刻时容易踩的坑

| 坑                                                | 解决                                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| 把 H1 做成居中（很多人下意识居中大标题）          | 全站左对齐，是签名级特征                                              |
| 给 H1 加逐字渐入动画                              | 原站没有，克制是它的设计语言                                          |
| 把"在线"做成蓝色                                  | 用 `#57e88b` 绿                                                       |
| count-up 数字                                     | 原站静态，不要自作主张加                                              |
| 搜索加 debounce 200ms                             | 原站无 debounce，体验是"键入即看到结果"                                |
| 卡片用 box-shadow 黑色阴影                        | 用 `color-mix(in srgb, var(--acc) 45%, transparent)` 项目色阴影        |
| 加载 Google Fonts                                 | 千万不要 — 这是它的差异化性能优势                                     |
| 卡片圆角用 16px                                   | 用 **22px**（这是 `.card` 的 border-radius）                          |
| nav 用纯色背景                                    | 必须 `rgba(5,7,15,.55) + backdrop-filter: blur(18px)` 半透明          |
| "全部"按钮 active 态用纯色背景                   | 用 cyan→violet 渐变                                                  |
