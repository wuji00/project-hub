// Project grid + filter + search — interactive
// 'use client' — holds filter + query state, no debounce per ajw.cn spec
"use client";

import { useMemo, useState } from "react";
import { PROJECTS, type Project } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import FilterPills from "./FilterPills";
import SearchBox from "./SearchBox";

type Filter = "all" | "online" | "building";

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const list = useMemo<Project[]>(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const okF = filter === "all" || p.status === filter || (filter === "building" && p.developing);
      if (!okF) return false;
      if (!q) return true;
      const hay = `${p.name} ${p.english} ${p.kind} ${p.summary} ${p.functions.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  return (
    <main className="wrap" id="projects">
      <div className="sec-head">
        <h2>项目索引</h2>
        <p className="note">「在线」为最近一次公网复核记录（2026-07-29），非永久健康保证。开发中项目不提供入口。</p>
      </div>
      <div className="controls" role="group" aria-label="项目筛选与搜索">
        <FilterPills filter={filter} onChange={setFilter} />
        <SearchBox value={query} onChange={setQuery} />
      </div>
      <div className="grid" id="grid">
        {list.map((p) => <ProjectCard project={p} key={p.id} />)}
      </div>
      <div className="empty" style={{ display: list.length === 0 ? "block" : "none" }}>
        没有找到匹配的项目 —— 换个关键词，或清除筛选试试。
      </div>
    </main>
  );
}
