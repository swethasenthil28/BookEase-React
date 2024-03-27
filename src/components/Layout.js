
import { Outlet, Link } from "react-router-dom";


function Layout() {
  const role = localStorage.getItem("role")
  return (
    <>

      <nav className="navbar navbar-expand-sm bg-info navbar-dark">
        <div className="container-fluid">

          <ul className="navbar-nav">
          
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>

      
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
     
            {role === "admin"  && <li className="nav-item">
              <Link to="/displayhalls" className="nav-link">Halls</Link>
            </li>}
            {role === "admin" && <li className="nav-item">
              <Link to="/addhall" className="nav-link">Add Hall</Link>
            </li>}

          </ul>
        </div>
      </nav>

      <Outlet />

    </>
  );
}

export default Layout;