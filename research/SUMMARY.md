# AJW.CN 复刻蓝图 · SUMMARY

> 1 页总结。完整拆解见 `ajw-cn-visual-dna.md` / `ajw-cn-interaction-dna.md` / `ajw-cn-stack.md` / `ajw-cn-blind-test-checklist.md`。

---

## 5 条最关键的视觉 DNA

1. **H1 用 `clamp(44px, 7.2vw, 96px)` + line-height 1.06 + 负字距 -0.01em**，且"一束光"三字用 `linear-gradient(100deg, #4dd8e6 0%, #a78bfa 45%, #ff6b5e 100%)` + `drop-shadow(0 0 26px rgba(120,110,255,.35))`。**左对齐、不居中**。
2. **深色 aurora 背景**：3 个 `filter: blur(90px)` 的 blob（紫 `#3b2d8f` / 青 `#0e5a66` / 粉紫 `#6d2a5e`），加 1px 圆点网格（120px 间距，opacity 0.06），漂浮动效 26/32/38s ease-in-out alternate。
3. **零 webfont、纯系统字体**：`-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif`。中文行高 1.75–1.9（极松），小标宽 letter-spacing 0.22–0.34em + uppercase。
4. **状态色克制**：在线 = `#57e88b` 绿 + 8px 绿光 + 2.4s pulse；开发中 = `#f5c445` 金。**不蓝不红**。
5. **bento 6 列网格 + 卡片 22px 圆角 + 全胶囊按钮**（999px）。卡片 hover 上浮 5px、图片 scale(1.05) 0.6s 自定义贝塞尔，**描边和阴影用 `color-mix(in srgb, var(--acc) 45%, transparent)` 由项目强调色派生**（不是黑色阴影）。

---

## 5 条最关键的交互 DNA

1. **筛选 pill 切换直接 `innerHTML` 重写**（无过渡动画），active 态 = `cyan→violet` 渐变 + 黑色字 + bold。**搜索无 debounce**，input 即渲染。
2. **Logo 双层 conic-gradient + 7.2s 循环动画**：orb 飞走、字母逐个错峰进出（4% 间隔），贝塞尔 `cubic-bezier(.2, .9, .25, 1.16)` 带弹性回弹。
3. **滚动是浏览器原生 `html { scroll-behavior: smooth }`**，**没有 IntersectionObserver 触发的入场动画**、**没有 count-up 数字**、**没有 parallax**。克制是设计语言。
4. **完整支持 `prefers-reduced-motion`**：aurora、logo、status pulse、卡片过渡、平滑滚动 5 项全部禁用。
5. **零外部依赖**：1 HTML + 1 SVG favicon + 8 张 PNG（lazy），所有 CSS / JS 内联，单文件 24KB gz 前。8 个项目**硬编码在 JS 数组**。

---

## 技术栈判断

- **纯静态 HTML+CSS+vanilla JS**，24KB 单文件
- **0 webfont**、**0 外部 CSS**、**0 外部 JS**、**0 框架**
- 现代 CSS：`clamp()` / `color-mix()` / `aspect-ratio` / `backdrop-filter` / `conic-gradient`
- 响应式断点：**960px 和 640px 两个**（不是常见的 768/1024）
- 8 个项目用 grid bento 排版（span 2/3/4 混合），用 CSS 变量 `--acc` 传递每张卡片的强调色
- favicon 用 SVG，所有卡片封面 PNG（未做 WebP/AVIF 优化）

---

## 复刻难度：**低**（不是"中"，是真的低）

理由：

- 单文件、24KB、所有代码可直接复制
- 无第三方依赖，无构建步骤
- 无复杂动效，logo 动效用 4 个 keyframes 写死即可
- 视觉系统只有 14 个 CSS 变量
- 响应式 2 个断点，桌面端单列变 1 列即可

**但有 3 个"看着简单实则容易翻车"的风险点**：

1. **左对齐反直觉** — 复刻者很容易下意识把 H1 居中（这是中文站点最常见的选择），原站刻意左对齐是签名级特征。丢失这一条，盲测 A6 直接 -10 分。
2. **`color-mix(in srgb, var(--acc) 45%, transparent)` 项目色阴影** — 大部分人会用 `box-shadow: 0 0 20px #000` 黑色阴影，这会立刻暴露"复刻味"。必须用项目强调色派生。盲测 D2 直接 -8 分。
3. **零 webfont 决策** — 复刻者会觉得"加个 Google Fonts 更精致"，但这会破坏原站最核心的差异化性能优势。盲测 B1 + G5 双扣分（-20），且无法挽回。

附加细节风险（次要）：

- aurora 3 个 blob 的颜色要精确（不是泛指"蓝紫"）
- eyebrow 前的 34px 渐变横线是"高定感"来源
- 状态点用绿+金不是蓝+红

---

## 交付物清单

| 文件 | 用途 | 状态 |
| --- | --- | --- |
| `ajw-cn-01-hero.png` | 首屏截图 | 已落地 |
| `ajw-cn-02-projects.png` | 项目区截图 | 已落地 |
| `ajw-cn-03-footer.png` | 全页+页脚截图 | 已落地 |
| `ajw-cn-source.html` | 完整 HTML 源码 | 已落地 |
| `ajw-cn-visual-dna.md` | 视觉拆解 | 已落地 |
| `ajw-cn-interaction-dna.md` | 交互拆解 | 已落地 |
| `ajw-cn-stack.md` | 技术栈拆解 | 已落地 |
| `ajw-cn-blind-test-checklist.md` | 盲测清单（30 条维度） | 已落地 |
| `SUMMARY.md` | 1 页总结（本文） | 已落地 |

---

## 给 builder 的 5 步执行建议

1. **复制 `ajw-cn-source.html`** 作为起点（脱敏版本 + 替换自己的项目数据）
2. **保留所有 CSS 变量**（`--bg` / `--ink` / `--coral` / `--gold` / `--cyan` / `--violet` 等），只改 8 个项目硬编码数据
3. **把封面图换成自己的**（保持 `assets/xxx.png` 路径约定 + `loading="lazy"`）
4. **不要加 Google Fonts**（系统字体已经够用）
5. **跑 `ajw-cn-blind-test-checklist.md` 30 条维度**，目标 360+/450 = "过线"

---

> 蓝图已落盘到 `research/`，9 个文件全部就位。
> builder 可以直接拿着 `ajw-cn-source.html` 当脚手架 + `ajw-cn-blind-test-checklist.md` 当 QA 清单开干。
