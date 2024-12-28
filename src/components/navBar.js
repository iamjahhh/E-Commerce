import './navBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">SHOP</a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/categories">Categories</a></li>
            <li className="nav-item"><a className="nav-link" href="/deals">Deals</a></li>
          </ul>
          
          <form className="d-flex me-3">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search products..." />
              <button className="btn btn-outline-dark" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          
          <div className="d-flex align-items-center">
            <a href="/cart" className="nav-icon">
              <i className="fas fa-shopping-cart"></i>
            </a>
            <a href="/account" className="nav-icon">
              <i className="fas fa-user"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
