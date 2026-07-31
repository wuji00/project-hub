// Project card — single project rendering
// RSC: pure markup, parent passes data
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { name, english, kind, url, repo, status, developing, accent, span, mark, summary, functions, art, alt, hideProductLink } = project;
  const showBuildingBadge = status === "building" || developing;
  return (
    <article className={`card span${span}`} style={{ "--acc": accent } as React.CSSProperties}>
      <div className="art">
        <img src={art} alt={alt} loading="lazy" decoding="async" />
        <div className="statuses">
          <span className={`status ${status}`}>
            <span className="dot" />
            {status === "online" ? "在线" : "开发中"}
          </span>
          {showBuildingBadge && status === "online" && developing ? (
            <span className="status building"><span className="dot" />开发中</span>
          ) : null}
        </div>
      </div>
      <div className="body">
        <span className="mark">{mark}</span>
        <h3>{name}</h3>
        <span className="kind">{kind}</span>
        <p className="summary">{summary}</p>
        <div className="tags">
          {functions.map((f) => <span className="tag" key={f}>{f}</span>)}
        </div>
        <div className="actions">
          {url && !hideProductLink ? (
            <a className="open" href={url} target="_blank" rel="noopener noreferrer">打开产品 ↗</a>
          ) : status === "building" ? (
            <span className="na">开发中 · 暂无入口</span>
          ) : null}
          {repo ? (
            <a className="repo" href={repo} target="_blank" rel="noopener noreferrer">开源地址 ↗</a>
          ) : (
            <span className="na">源码暂未公开</span>
          )}
        </div>
      </div>
    </article>
  );
}
