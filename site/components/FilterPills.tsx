// Filter pills — 3 state buttons
// 'use client' — interactive
import { COUNTERS } from "@/data/projects";

type Filter = "all" | "online" | "building";

export default function FilterPills({
  filter,
  onChange,
}: {
  filter: Filter;
  onChange: (f: Filter) => void;
}) {
  const items: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "全部", count: COUNTERS.total },
    { id: "online", label: "在线", count: COUNTERS.online },
    { id: "building", label: "开发中", count: COUNTERS.building },
  ];
  return (
    <div className="pills" role="group" aria-label="按状态筛选">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className="pill"
          data-filter={it.id}
          aria-pressed={filter === it.id}
          onClick={() => onChange(it.id)}
        >
          <span>{it.label}</span>
          <em>{String(it.count).padStart(2, "0")}</em>
        </button>
      ))}
    </div>
  );
}
