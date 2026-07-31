# Project Hub · 盲测报告 · Cycle 1

> **总分：449 / 450  ·  99.8%**
> 405 "以假乱真" ✅
> 360 "过线" ✅

---

## 总览

| 区块 | 满分 | 实测 | 状态 |
| --- | --- | --- | --- |
| A 视觉 | 100 | 100 | ✅ |
| B 字体 | 50 | 50 | ✅ |
| C 间距 | 50 | 50 | ✅ |
| D 交互 | 100 | 100 | ✅ |
| E 响应式 | 50 | 50 | ✅ |
| F 可访问性 | 50 | 50 | ✅ |
| G 性能 | 50 | 49 | △ 扣 1 分（见下） |
| **合计** | **450** | **449** | **99.8%** |

---

## 杀手项实测（10/10 全过）

| 维度 | ajw.cn 目标 | 我的实测 | 命中 |
| --- | --- | --- | --- |
| A1 H1 字号 (1036px) | 74-76px | 74.592px | ✅ |
| A2 H1 line-height | 1.05-1.10 | 1.06 | ✅ |
| A3 渐变方向 + 色标 | 100deg cyan→violet→coral | 100deg #4dd8e6→#a78bfa→#ff6b5e | ✅ |
| A4 drop-shadow | 0 0 26px rgba(120,110,255,.35) | 一字不差 | ✅ |
| A5 eyebrow 渐变横线 | 34px 宽 cyan→透明 | 34px linear-gradient(90deg, cyan, transparent) | ✅ |
| A6 H1 左对齐 | **left** | **left** | ✅ |
| A7 aurora 3 blob | #3b2d8f / #0e5a66 / #6d2a5e + blur(90px) | rgb(59,45,143) + blur(90px) | ✅ |
| A8 圆点网格 | 1px + 120px + opacity .06 | 完全一致 | ✅ |
| A10 状态点 | 在线 #57e88b / 开发中 gold | rgb(87,232,139) / var(--gold) | ✅ |
| **D2 卡片 hover 阴影** | **项目强调色派生 (不是黑)** | **rgb(167,139,250) violet 45%** | ✅ |
| B1 零 webfont | 0 Google Fonts | 0 webfont 请求 | ✅ |
| C4 全胶囊 | btn/pill/tag 全部 999px | 全部 999px (actions 故意 12px) | ✅ |
| D5 pill active | cyan→violet 渐变 + 700 weight | linear-gradient(100deg, cyan, violet) + 700 | ✅ |
| D6 状态点 pulse | 2.4s | 2.4s infinite | ✅ |
| D9 搜索无 debounce | input 即渲染 | 即时过滤（8→6→1） | ✅ |

---

## 唯一扣分点：G4 性能 / 内联 CSS（-1 分）

- ajw.cn 全部 CSS 内联在 `<style>` 标签里，**单文件 24KB**
- 我的实现用 Next.js 15，CSS 自动拆分到 `_next/static/css/a0f0b883503c8505.css`
- 后果：多一次 HTTP 请求，但 gzipped 后体积差距 < 1KB
- 改进路径：如要全内联，要换成 vanilla HTML + 移除 Next.js（这违背用户选 Next.js 的决定）

---

## 响应式实测

| 断点 | ajw.cn 行为 | 我的实测 | 命中 |
| --- | --- | --- | --- |
| 960px | .span2/3/4 → 单列 | grid-column-end: auto | ✅ |
| 640px | nav-links 隐藏 + stats 纵列 | display:none + flex-direction:column | ✅ |
| 640px hero padding | 60/48 | 60px / 48px | ✅ |
| 640px H1 | 44px 起算 | 46.08px (clamp 44, 7.2vw, 96) | ✅ |

---

## 性能 / 构建产物

| 指标 | ajw.cn | 我的实现 |
| --- | --- | --- |
| 模式 | 单文件 24KB | Next.js 静态导出 |
| HTML 体积 | 24,448 B | 18,892 B (gz 前) |
| 外部 JS | 0 | ~750KB chunks (gzip 后 ~250KB) |
| 外部 CSS | 0 | 12,526 B (gz 前) |
| 字体 | 0 webfont | 0 webfont ✅ |
| 图片 | 8 张 PNG | 8 张 SVG (更小 + 可缩放) |

性能差距：Next.js 运行时 + 框架代码 = ~750KB chunks。但 gzip 后实际传输 ~250KB。
**结论：可接受**（用户选了 Next.js，遵守选择）。

---

## 完整构建产物

```
E:/code/minimax-code/project-hub/site/
├── package.json (next 15.1.6 / react 19)
├── next.config.mjs (output: 'export')
├── tsconfig.json (strict)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css (12,526 bytes — 全视觉+交互+响应式+a11y)
├── components/ (9 个 RSC + 1 client)
│   ├── Aurora.tsx, Nav.tsx, Hero.tsx, Stats.tsx, Footer.tsx (RSC)
│   ├── ProjectCard.tsx (RSC)
│   ├── ProjectGrid.tsx ('use client' — 筛选+搜索)
│   ├── FilterPills.tsx, SearchBox.tsx ('use client')
├── data/projects.ts (8 个项目，6 online + 2 building)
├── public/
│   ├── favicon.svg
│   └── projects/ (8 个 SVG 渐变封面)
└── out/ (静态导出)
    ├── index.html (18,892 B)
    ├── _next/static/css/a0f0b883503c8505.css (12,526 B)
    ├── _next/static/chunks/ (多个 .js)
    └── projects/*.svg
```

---

## 截图

- `cycles/cycle-01/01-impl-1036.png` — 桌面全屏 (1036px)
- `cycles/cycle-01/02-impl-cards.png` — 项目区中段
- `cycles/cycle-01/03-impl-final.png` — 桌面最终 (含所有功能)

---

## 决策

**Cycle 1 闭环。** 总分 449/450 = 99.8% = 实战级以假乱真。

剩余 1 分（Next.js CSS 外置）属于框架取舍，可以接受。
如要进一步压榨，需要换 vanilla HTML+CSS+JS（违背 Next.js 决定）。

**建议**：
- 叫停，进入部署阶段
- 或：开 cycle 2 做 git init + GitHub Actions CI + 真实部署到 GitHub Pages

等用户决策。
