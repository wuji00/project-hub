// Stats — 3-cell metrics (online / building / total)
// RSC
import { COUNTERS } from "@/data/projects";

export default function Stats() {
  return (
    <div className="wrap">
      <div className="stats" role="list" aria-label="项目统计">
        <div className="stat" role="listitem">
          <b>{String(COUNTERS.online).padStart(2, "0")}</b>
          <span>在线 Online</span>
        </div>
        <div className="stat" role="listitem">
          <b>{String(COUNTERS.building).padStart(2, "0")}</b>
          <span>开发中 Building</span>
        </div>
        <div className="stat" role="listitem">
          <b>{String(COUNTERS.total).padStart(2, "0")}</b>
          <span>项目 Projects</span>
        </div>
      </div>
    </div>
  );
}
