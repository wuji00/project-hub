// Hero — large headline + lede + CTAs
// RSC
export default function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="eyebrow">Ai匠坞 · AJW.CN PROJECT HUB · 2026</div>
      <h1>
        每个想法，<br />
        都有<span className="glow">一束光</span>的入口。
      </h1>
      <p className="lede">
        从语音冒险到宠物翻译，从模型榜单到世界共建 —— 这里是 Ai匠坞正在运行、正在生长的产品现场，每个入口都通向一个真实可打开的产品和它的源码。
      </p>
      <div className="cta-row">
        <a className="btn btn-primary" href="#projects">探索项目 ↓</a>
        <a className="btn btn-ghost" href="https://github.com/demo" target="_blank" rel="noopener noreferrer">GitHub 组织 ↗</a>
      </div>
    </header>
  );
}
