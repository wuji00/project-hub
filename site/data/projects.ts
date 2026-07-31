// data/projects.ts
// 8 个 demo 项目，6 online + 2 building。span 分布模拟 ajw.cn 的 bento 6 列网格
// accent 用 CSS 变量名（与 globals.css 对应）

export type ProjectStatus = "online" | "building";

export interface Project {
  id: string;
  name: string;
  english: string;
  mark: string;        // 顶部小标（大写）
  kind: string;        // 类型短描述
  url: string;
  repo: string;
  status: ProjectStatus;
  developing?: boolean; // 部分 online 项目也在迭代
  accent: string;      // CSS 变量名
  span: 2 | 3 | 4;
  summary: string;
  functions: string[];
  art: string;         // /projects/<slug>.svg
  alt: string;
  hideProductLink?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "aurora",
    name: "极光",
    english: "AURORA",
    mark: "01 / AURORA",
    kind: "AI 模型评测与榜单",
    url: "https://example.com/aurora",
    repo: "https://github.com/demo/aurora",
    status: "online",
    accent: "var(--violet)",
    span: 4,
    summary: "一个不靠厂商公关稿的模型评测场。从事实性、推理、代码到中文写作，6 个维度、320 题全公开测试集，每周更新一次。",
    functions: ["评测", "模型", "中文", "开源", "周更"],
    art: "projects/aurora.svg",
    alt: "极光 · 模型评测与榜单的渐变封面",
  },
  {
    id: "echo",
    name: "回声",
    english: "ECHO",
    mark: "02 / ECHO",
    kind: "实时语音社交",
    url: "https://example.com/echo",
    repo: "https://github.com/demo/echo",
    status: "online",
    accent: "var(--cyan)",
    span: 2,
    summary: "把会议室里最常被淹没的声音放大。10 人以下的小房间，端到端延迟压在 180ms 内。",
    functions: ["WebRTC", "语音", "低延迟", "PWA"],
    art: "projects/echo.svg",
    alt: "回声 · 实时语音社交的渐变封面",
  },
  {
    id: "rhythm",
    name: "律动",
    english: "RHYTHM",
    mark: "03 / RHYTHM",
    kind: "AI 音乐生成",
    url: "https://example.com/rhythm",
    repo: "https://github.com/demo/rhythm",
    status: "online",
    accent: "var(--coral)",
    span: 3,
    summary: "哼一段、敲几拍、丢一句中文歌词，给你一首带人声的完整歌曲。模型权重开源，可商用。",
    functions: ["音乐", "人声", "开源", "可商用"],
    art: "projects/rhythm.svg",
    alt: "律动 · AI 音乐生成的渐变封面",
  },
  {
    id: "inkstone",
    name: "砚台",
    english: "INKSTONE",
    mark: "04 / INKSTONE",
    kind: "中文写作助手",
    url: "https://example.com/inkstone",
    repo: "https://github.com/demo/inkstone",
    status: "online",
    accent: "var(--gold)",
    span: 3,
    summary: "从公众号长文到小红书短文，从论文摘要到工作邮件。理解中文语气的 12 个细微维度，给出可解释的修改建议。",
    functions: ["写作", "中文", "语气", "可解释"],
    art: "projects/inkstone.svg",
    alt: "砚台 · 中文写作助手的渐变封面",
  },
  {
    id: "weave",
    name: "织梦",
    english: "WEAVE",
    mark: "05 / WEAVE",
    kind: "知识图谱协作",
    url: "https://example.com/weave",
    repo: "https://github.com/demo/weave",
    status: "online",
    accent: "var(--lime)",
    span: 2,
    summary: "把笔记、聊天记录、PDF、网页揉成一张可编辑的知识网。",
    functions: ["图谱", "协作", "导入", "检索"],
    art: "projects/weave.svg",
    alt: "织梦 · 知识图谱协作的渐变封面",
  },
  {
    id: "prism",
    name: "棱镜",
    english: "PRISM",
    mark: "06 / PRISM",
    kind: "数据可视化 IDE",
    url: "https://example.com/prism",
    repo: "https://github.com/demo/prism",
    status: "online",
    developing: true,
    accent: "var(--blue)",
    span: 4,
    summary: "在浏览器里把 CSV 拖进去，3 分钟得到一份可发表的可视化报告。所有图表都是可声明的、可重放的、可嵌入的。",
    functions: ["可视化", "CSV", "报告", "嵌入"],
    art: "projects/prism.svg",
    alt: "棱镜 · 数据可视化 IDE 的渐变封面",
  },
  {
    id: "refract",
    name: "折光",
    english: "REFRACT",
    mark: "07 / REFRACT",
    kind: "图像生成 · 多模态编辑",
    url: "",
    repo: "https://github.com/demo/refract",
    status: "building",
    accent: "var(--orange)",
    span: 3,
    summary: "用自然语言精修图片中的局部元素，光照、视角、材质都保持一致。预计 2026 Q4 公测。",
    functions: ["图像", "编辑", "局部", "多模态"],
    art: "projects/refract.svg",
    alt: "折光 · 图像生成的渐变封面（开发中）",
    hideProductLink: true,
  },
  {
    id: "ripple",
    name: "涟漪",
    english: "RIPPLE",
    mark: "08 / RIPPLE",
    kind: "协作白板 + 实时 AI",
    url: "",
    repo: "https://github.com/demo/ripple",
    status: "building",
    accent: "var(--violet)",
    span: 3,
    summary: "无限画布 + AI 副驾：你画一半，AI 补另一半。开源协同协议，公测筹备中。",
    functions: ["白板", "协作", "AI", "实时"],
    art: "projects/ripple.svg",
    alt: "涟漪 · 协作白板的渐变封面（开发中）",
    hideProductLink: true,
  },
];

export const COUNTERS = {
  online: PROJECTS.filter(p => p.status === "online").length,
  building: PROJECTS.filter(p => p.status === "building").length,
  total: PROJECTS.length,
};
