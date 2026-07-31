# AJW.CN 盲测对比清单

> 用途：builder 复刻完后，逐条对照这份清单做"盲测"——不看原站，只看自己实现的截图/代码，对每条评分（0-10），找差距。
> 总分 = 1000（满分 100 条 × 10 分），但本清单给出 30 条最具区分度的"客观可判定"维度。

---

## A. 视觉（10 条）

### A1. Hero H1 字号与视口宽度的比例
- **参考原值**：`clamp(44px, 7.2vw, 96px)`，在 1036px 视口实测 **74.6px**
- **评分标准**：
  - 10 分 = 实测 74-76px（1036px 视口）
  - 8 分 = 70-80px
  - 5 分 = 60-90px
  - 0 分 = 偏离 30% 以上
- **怎么测**：F12 → 取 `.hero h1` → `getComputedStyle().fontSize`

### A2. Hero H1 line-height
- **参考原值**：1.06
- **评分标准**：
  - 10 分 = 1.05-1.10
  - 5 分 = 1.0 或 1.15
  - 0 分 = 1.2+

### A3. Hero H1 渐变方向与色标
- **参考原值**：`linear-gradient(100deg, #4dd8e6 0%, #a78bfa 45%, #ff6b5e 100%)` 应用在"一束光"三字
- **评分标准**：
  - 10 分 = 100deg + 三色标位置完全正确
  - 6 分 = 方向正确（90-110deg）但色标错位
  - 0 分 = 用纯色或其他渐变

### A4. Hero H1 drop-shadow
- **参考原值**：`filter: drop-shadow(0 0 26px rgba(120,110,255,.35))` 在 .glow 上
- **评分标准**：
  - 10 分 = 26px 模糊 + 紫光 35% 不透明
  - 5 分 = 阴影存在但尺寸/颜色明显错

### A5. Hero eyebrow 渐变横线
- **参考原值**：`width: 34px; height: 1px; background: linear-gradient(90deg, var(--cyan), transparent)`
- **评分标准**：
  - 10 分 = 34px 宽、1px 高、cyan→透明、出现在 eyebrow 文字左侧
  - 0 分 = 缺失或尺寸错

### A6. Hero 标题对齐方式
- **参考原值**：**左对齐**（不是居中）
- **评分标准**：
  - 10 分 = 左对齐
  - 0 分 = 居中（这是最常见的"复刻错"）

### A7. Aurora 背景 3 个 blob
- **参考原值**：
  - blob1：紫 `#3b2d8f`，左上 56vw
  - blob2：青 `#0e5a66`，右上 44vw
  - blob3：粉紫 `#6d2a5e`，左中下 40vw
  - 全部 `filter: blur(90px); opacity: .5`
- **评分标准**：
  - 10 分 = 3 个都在，颜色/尺寸/位置完全正确
  - 5 分 = 有 aurora 但颜色或位置错
  - 0 分 = 无 aurora 层

### A8. 1px 圆点网格叠加
- **参考原值**：`background-image: radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px); background-size: 120px 120px; opacity: .06`
- **评分标准**：
  - 10 分 = 1px 圆点、120px 间距、opacity 0.06
  - 0 分 = 缺失

### A9. 容器宽度
- **参考原值**：`max-width: 1240px; padding: 0 28px`（移动 16px）
- **评分标准**：
  - 10 分 = 1240px + 28px padding
  - 5 分 = 1200 或 1280
  - 0 分 = 1100 或 1400

### A10. 状态点颜色
- **参考原值**：
  - 在线 = `#57e88b` 绿 + 8px 绿光
  - 开发中 = `#f5c445` 金 + 8px 金光
- **评分标准**：
  - 10 分 = 绿+金，颜色和发光都正确
  - 3 分 = 用蓝/红（最常见错）
  - 0 分 = 状态点缺失

---

## B. 字体（5 条）

### B1. 字体栈
- **参考原值**：`-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif`
- **评分标准**：
  - 10 分 = 0 webfont，0 Google Fonts 请求，纯系统字体
  - 0 分 = 引入了 Google Fonts（即便效果"像"，也丢失了性能优势）

### B2. H1 字重
- **参考原值**：800
- **评分标准**：
  - 10 分 = 800
  - 5 分 = 700 或 900
  - 0 分 = 400 / 500

### B3. 字号阶跃
- **参考原值**：h1 74 / h2 41 / stat 34 / cardH3 24（span4）/ cardH3 20（默认）/ lede 16 / btn 14 / tag 11 / mark 10
- **评分标准**：
  - 10 分 = 阶跃比例与原值一致（±10%）
  - 0 分 = 阶跃混乱或过于平

### B4. Letter-spacing 规律
- **参考原值**：大字负值（-0.01em）压紧，小字正值（0.22-0.34em）撑开
- **评分标准**：
  - 10 分 = h1 -0.01em / tag 0.3em
  - 0 分 = 所有文字一个 letter-spacing

### B5. 中文大段行高
- **参考原值**：lede 1.9、summary 1.75、note 1.8（极松）
- **评分标准**：
  - 10 分 = 1.7-1.9
  - 0 分 = 1.4-1.5（常见默认）

---

## C. 间距（5 条）

### C1. Hero 上下内边距
- **参考原值**：`padding: 96px 0 72px`（移动 60 0 48）
- **评分标准**：
  - 10 分 = 96/72 桌面，60/48 移动
  - 5 分 = 上下间距接近但数值有 10-20px 偏差

### C2. Section head 间距
- **参考原值**：`margin: 40px 0 28px`
- **评分标准**：
  - 10 分 = 40/28
  - 0 分 = 30/20 或 50/40

### C3. 卡片圆角
- **参考原值**：`border-radius: 22px`
- **评分标准**：
  - 10 分 = 22px
  - 5 分 = 16px 或 24px
  - 0 分 = 8px 或 32px

### C4. 按钮圆角（pill 风）
- **参考原值**：`border-radius: 999px`（btn、pill、search、tag、status 全部 999px = 完美胶囊）
- **评分标准**：
  - 10 分 = 全部胶囊形
  - 0 分 = 任何按钮用直角或 8px 圆角

### C5. Bento grid 间距
- **参考原值**：`gap: 18px`
- **评分标准**：
  - 10 分 = 18px
  - 5 分 = 16px 或 20px

---

## D. 交互（10 条）

### D1. 卡片 hover 上浮
- **参考原值**：`transform: translateY(-5px)` + 0.3s 过渡
- **评分标准**：
  - 10 分 = -5px + 同步图片 scale(1.05)
  - 5 分 = 上浮但数值错
  - 0 分 = 无 hover 效果

### D2. 卡片 hover 描边/阴影颜色
- **参考原值**：`color-mix(in srgb, var(--acc) 55%, transparent)` 描边 + 45% 阴影
- **评分标准**：
  - 10 分 = 阴影颜色由项目强调色派生（不是黑色！）
  - 0 分 = 黑色阴影（最常见错）

### D3. 卡片图片 hover 缩放曲线
- **参考原值**：`cubic-bezier(.2, .7, .2, 1)` + 0.6s + scale(1.05)
- **评分标准**：
  - 10 分 = 自定义贝塞尔曲线正确
  - 5 分 = 用 ease-out
  - 0 分 = 无缩放

### D4. 主按钮 hover
- **参考原值**：`translateY(-2px)` + 阴影变大变深
- **评分标准**：
  - 10 分 = 上浮 + 阴影加深
  - 0 分 = 仅变色

### D5. 筛选 pill active 态
- **参考原值**：`linear-gradient(100deg, var(--cyan), var(--violet))` + `color:#05070f` + `font-weight:700`
- **评分标准**：
  - 10 分 = cyan→violet 渐变底
  - 0 分 = 纯色或缺少 weight 变化

### D6. 状态点 pulse 动画
- **参考原值**：在线点 2.4s 循环 opacity 1→0.35→1
- **评分标准**：
  - 10 分 = 2.4s 周期
  - 0 分 = 无 pulse 或周期错

### D7. Logo orb 动效
- **参考原值**：7.2s 循环，orb 飞走 + 字母逐个进出
- **评分标准**：
  - 10 分 = 双层 conic-gradient + 7.2s 循环 + 字母错峰
  - 3 分 = 静态 logo
  - 0 分 = 用图片代替

### D8. Aurora blob 漂浮动效
- **参考原值**：3 个 blob 不同周期（26/32/38s）ease-in-out infinite alternate
- **评分标准**：
  - 10 分 = 3 周期各不同 + alternate
  - 5 分 = 有动效但同步
  - 0 分 = 静态背景

### D9. 搜索响应速度
- **参考原值**：`input` 事件无 debounce，立即重渲染
- **评分标准**：
  - 10 分 = 键入即看到过滤
  - 0 分 = 加了 debounce（违反原设计）

### D10. 滚动平滑度
- **参考原值**：`html { scroll-behavior: smooth }`
- **评分标准**：
  - 10 分 = 锚点跳转平滑
  - 0 分 = 瞬移

---

## E. 响应式（5 条）

### E1. 断点 960px 行为
- **参考原值**：`@media (max-width: 960px)` 下所有 span 卡片变单列
- **评分标准**：
  - 10 分 = 960px 以下 .span2/3/4 → span 6（即单列）
  - 0 分 = 用 768 或 1024

### E2. 断点 640px 行为
- **参考原值**：`@media (max-width: 640px)` 隐藏 nav-links、stats 变纵列
- **评分标准**：
  - 10 分 = 640px 以下 nav-links display:none、stats flex-direction:column
  - 0 分 = 移动端布局混乱

### E3. 移动端 hero padding
- **参考原值**：`padding: 60px 0 48px`（移动）
- **评分标准**：
  - 10 分 = 60/48
  - 0 分 = 继承桌面值

### E4. 移动端 H1 字号
- **参考原值**：`clamp(44px, ...)` 在移动端最低 44px
- **评分标准**：
  - 10 分 = 不超过视口宽度（44px 起算）
  - 0 分 = H1 在移动端溢出

### E5. 移动端 nav 隐藏
- **参考原值**：nav-links 在 640px 以下 `display: none`
- **评分标准**：
  - 10 分 = 640px 以下只剩 logo
  - 0 分 = 移动端显示挤在一起的 nav

---

## F. 可访问性（5 条）

### F1. Focus-visible 样式
- **参考原值**：`outline: 2px solid var(--cyan); outline-offset: 3px; border-radius: 4px` 应用到所有 a/button/input
- **评分标准**：
  - 10 分 = cyan 2px outline + 3px offset
  - 0 分 = 无 focus 样式（`:focus` 而不是 `:focus-visible`）

### F2. ARIA 属性
- **参考原值**：`aria-pressed`、`aria-label`、`role="list" / listitem`、`aria-hidden="true"`、search input 的 aria-label
- **评分标准**：
  - 10 分 = pills 有 aria-pressed、search 有 aria-label、sky 有 aria-hidden
  - 0 分 = 全部缺失

### F3. 减动效支持
- **参考原值**：`@media (prefers-reduced-motion: reduce)` 完整处理（aurora / logo / status / card / scroll）
- **评分标准**：
  - 10 分 = 5+ 条减动效处理
  - 0 分 = 完全没有

### F4. 选区色
- **参考原值**：`::selection { background: var(--violet); color: #05070f }`
- **评分标准**：
  - 10 分 = violet 选区
  - 0 分 = 默认蓝

### F5. Alt 属性
- **参考原值**：每个 `<img>` 都有 alt 描述
- **评分标准**：
  - 10 分 = 所有图有 alt
  - 0 分 = 缺失或 `alt=""`

---

## G. 性能（5 条）

### G1. 总下载体积
- **参考原值**：HTML 24KB + 8 张图（按需 lazy）+ favicon
- **评分标准**：
  - 10 分 = 首屏 HTML < 30KB
  - 5 分 = 30-100KB
  - 0 分 = 100KB+ 或引用外部库

### G2. 外部请求数
- **参考原值**：0 JS / 0 CSS / 0 webfont
- **评分标准**：
  - 10 分 = 0 外部 JS、0 外部 CSS
  - 0 分 = 引入了 React/Vue/jQuery

### G3. 图片懒加载
- **参考原值**：所有 `<img>` 加 `loading="lazy"`
- **评分标准**：
  - 10 分 = 全部 lazy
  - 0 分 = 首屏图也立即加载

### G4. 关键 CSS 内联
- **参考原值**：所有 CSS 在 `<style>` 内联
- **评分标准**：
  - 10 分 = 内联
  - 0 分 = 外部 CSS 文件

### G5. 字体加载策略
- **参考原值**：无 webfont = 0 FOUT
- **评分标准**：
  - 10 分 = 0 webfont
  - 0 分 = 加载 Google Fonts 但没用 font-display:swap

---

## 评分汇总表

| 区块 | 满分 | 关键分水岭 |
| --- | --- | --- |
| A 视觉  | 100 | A3 (渐变) + A6 (左对齐) + A7 (aurora) 是 3 大杀手 |
| B 字体  | 50  | B1 (无 webfont) + B5 (中文行高) |
| C 间距  | 50  | C4 (全胶囊) 是签名 |
| D 交互  | 100 | D2 (项目色阴影) 是高级感核心 |
| E 响应式 | 50  | E1 (960 断点) + E2 (640 断点) |
| F 可访问性 | 50  | F3 (减动效) 是良心分 |
| G 性能  | 50  | G2 (零依赖) 是差异化 |
| **总分** | **450** | |

**复刻"过线"分**：360 / 450（80%）
**复刻"以假乱真"分**：405 / 450（90%）

最容易丢分（top 5）：

1. A6 hero 居中（-10）
2. A10 状态点用蓝/红（-7）
3. D2 卡片阴影用黑色（-8）
4. B1 引入 Google Fonts（-10 + 破坏 G5）
5. C4 按钮不用胶囊（-5）

---

## 用法

1. builder 完成实现后，**不打开原站**
2. 用浏览器 F12 一条条跑这个清单
3. 每个 0-10 分打完后算总分
4. 把"丢分项"列成 `ajw-cn-blind-test-result.md` 提交
5. 修复后再跑一次，对比 diff
