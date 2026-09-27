import './Header.css'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg pizza-navbar">
      <div className="container">
        <a className="navbar-brand pizza-logo" href="#">
          Pizza House
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#pizzaNavbar"
          aria-controls="pizzaNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="pizzaNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>

          <form className="d-flex search-form" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <button className="btn search-button" type="submit">
              <span>⌕</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header