import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import logoMobile from "../images/logo_m.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import user from "../images/user.svg";
import "./header.css";

const Header = () => {
  const activeStyle = {
    color: "#3692ff",
  };

  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  return (
    <header>
      <div className="nav-container">
        <button type="button" className="header-logo">
          <Link to="/" className="header-link">
            <img
              src={logo}
              alt="판다마켓로고"
              width="153"
              height="51"
              className="logo-pt"
            />
            <img
              src={logoMobile}
              alt="판다마켓로고"
              width="81"
              height="27"
              className="logo-m"
            />
          </Link>
        </button>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/community"
                className="link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/items"
                className="link"
                style={({ isActive }) =>
                  isActive || location.pathname === "/items"
                    ? activeStyle
                    : undefined
                }
              >
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        {isLoggedIn ? (
          <Link to="/">
            <img src={user} width="40" height="40" alt="프로필" />
          </Link>
        ) : (
          <Link to="/login" className="login_button">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
