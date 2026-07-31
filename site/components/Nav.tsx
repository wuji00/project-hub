// Sticky nav with logo + links
// RSC: pure markup
export default function Nav() {
  return (
    <nav>
      <div className="nav-in">
        <a className="brand" href="#top" aria-label="Project Hub home">
          <span className="brand-mark" aria-hidden="true">
            <span className="orb" />
            <span className="brand-letters">
              <span className="brand-letter logo-a">A</span>
              <span className="brand-letter logo-j">J</span>
              <span className="brand-letter logo-w">W</span>
              <span className="brand-letter logo-domain">.CN</span>
            </span>
          </span>
          <span className="brand-name">Ai匠坞</span>
          <small>/ PROJECT HUB</small>
        </a>
        <div className="nav-links">
          <a href="#projects">项目索引</a>
          <a href="https://github.com/demo" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>
    </nav>
  );
}
