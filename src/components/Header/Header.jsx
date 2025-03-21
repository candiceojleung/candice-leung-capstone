import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header__container">
    <h1 className="header__heading">periodic.ally</h1>
      <nav className="header__wrapper">
        <div className="header__left-link">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "header__link header__link--state"
                : "header__link"
            }
            to="/"
          >
            <h3 className="header__title">Homepage</h3>
          </NavLink>
        </div>
        <div className="header__right-link">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "header__link header__link--active"
                : "header__link"
            }
            to="/resources"
          >
            <h3 className="header__title">Resources</h3>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;