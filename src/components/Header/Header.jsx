import { NavLink, Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__heading">periodic.ally</h1>
      </Link>
      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "header__link header__link--selected" : "header__link"
          }
        >
          <img
            className="header__icon"
            src="../src/assets/icons/home.svg"
            alt="home"
          />
          <p className="header__text header__text--adjust">homepage</p>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "header__link header__link--selected" : "header__link"
          }
        >
          {" "}
          <img
            className="header__icon"
            src="../src/assets/icons/about-us.svg"
            alt="about-us icon"
          />
          <p className="header__text">about us</p>
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            isActive ? "header__link header__link--selected" : "header__link"
          }
        >
          <img
            className="header__icon"
            src="../src/assets/icons/open-book.svg"
            alt="resources icon"
          />
          <p className="header__text">resources</p>
        </NavLink>
        <NavLink
          to="/faqs"
          className={({ isActive }) =>
            isActive ? "header__link header__link--selected" : "header__link"
          }
        >
          <img
            className="header__icon"
            src="../src/assets/icons/faq.svg"
            alt="frequently asked questions icon"
          />
          <p className="header__text">faqs</p>
        </NavLink>
        <p className="header__text header__text--empty"></p>
      </nav>
    </header>
  );
}

export default Header;
