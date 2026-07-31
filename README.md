# Project Hub · AJW.CN 个人项目集主页

> 极简、深色、aurora 动效的 Next.js 15 静态站点。
> 视觉对标 [ajw.cn](https://ajw.cn)，盲测 **449/450 = 99.8%**（详见 `cycles/cycle-01/REPORT.md`）。

![Next.js](https://img.shields.io/badge/Next.js-15.1-000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react)
![License](https://img.shields.io/badge/license-MIT-b3541a?style=flat-square)

## 部署

- 框架：Next.js 15 App Router + TypeScript（严格模式）
- 导出：`output: 'export'` 静态产物
- CI/CD：GitHub Actions 自动部署到 GitHub Pages
- URL：`https://<your-username>.github.io/project-hub/`

## 本地开发

```bash
cd site
npm install
npm run dev
# 打开 http://localhost:3000/project-hub/
```

## 构建

```bash
cd site
npm run build
# 产物在 site/out/，可直接 serve 任何静态服务器
```

## 关键设计决策

| 决策 | 选择 | 原因 |
|---|---|---|
| 字体 | 系统字体（无 webfont） | ajw.cn 也是；保持性能优势 |
| 状态色 | 绿 #57e88b + 金 #f5c445 | ajw.cn 签名色；不蓝不红 |
| 卡片阴影 | color-mix(in srgb, var(--acc) 45%, transparent) | 项目强调色派生，不是黑色 |
| 按钮 | 999px 胶囊 | ajw.cn 全胶囊是签名 |
| 搜索 | 无 debounce | ajw.cn 设计就是即时过滤 |
| 渐变 hero | 100deg cyan→violet→coral | 跟原站一字不差 |
| 圆点网格 | 120px + opacity 0.06 | 跟原站一字不差 |

## 目录结构

```
project-hub/
├── site/                    # Next.js 应用
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css      # 12.5KB CSS（所有视觉+交互+响应式+a11y）
│   ├── components/          # 9 个组件
│   ├── data/projects.ts     # 8 个项目数据
│   ├── public/              # favicon + 8 SVG 封面
│   ├── next.config.mjs      # output: 'export', basePath: /project-hub
│   └── package.json
├── research/                # ajw.cn 拆解（视觉/交互/技术 DNA + 盲测清单）
├── cycles/
│   └── cycle-01/
│       ├── REPORT.md        # 盲测报告
│       ├── 01-impl-1036.png # 桌面截图
│       ├── 02-impl-cards.png
│       └── 03-impl-final.png
├── progress.html            # 实时进度面板
└── .github/workflows/deploy.yml
```

## 盲测 30 维度得分

| 区块 | 满分 | 实测 |
|---|---|---|
| A 视觉 | 100 | 100 |
| B 字体 | 50 | 50 |
| C 间距 | 50 | 50 |
| D 交互 | 100 | 100 |
| E 响应式 | 50 | 50 |
| F 可访问性 | 50 | 50 |
| G 性能 | 50 | 49 |
| 合计 | 450 | 449 |

详见 `cycles/cycle-01/REPORT.md`。

## License

MIT
