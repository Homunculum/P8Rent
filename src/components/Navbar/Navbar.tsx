import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Container } from "react-bootstrap";
const Navbar: React.FC = () => {
  const authContext: any = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="navbar-brand">
              <div className="logo-container">P8Rent</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2 active" aria-current="page" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/cars">
              Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2" to="/About">
              About
            </Link>
          </li>
        </ul>

        <div className="auth navbar-nav ml-auto" id="navbarText">
          <ul className="navbar-nav">
            {!authContext.isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Giriş Yap
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Kayıt Ol
                  </Link>
                </li>
              </>
            )}

            {authContext.isAuthenticated && (
              <li className="nav-item">
                <Link
                  onClick={() => {
                    authContext.setIsAuthenticated(false);
                  }}
                  to="/"
                  className="nav-link"
                >
                  Çıkış Yap
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
