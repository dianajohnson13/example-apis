export default function Header() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container">
            <a href="/" className="navbar-brand">Taskerly</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="/settings" className="nav-link">Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
}