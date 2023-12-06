export default function Header() {
    return (
      <header>
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
          <div class="container">
            <a href="/" class="navbar-brand">Taskerly</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navmenu"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navmenu">
              <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                  <a href="/settings" class="nav-link">Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
}