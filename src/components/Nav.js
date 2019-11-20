import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getCookie from '../common/getCookie';

export default function Nav({
  isLoggedIn,
  isAdmin,
  setIsLoggedIn,
  setIsAdmin,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const logout = () => {
    document.cookie = `Authorization=;expires=${new Date().toUTCString()}`;
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('Authorization'));
    if (document.cookie.includes('Authorization')) {
      const jwt = getCookie('Authorization').split(' ')[1];
      const payload = jwt.split('.')[1];
      const { admin } = JSON.parse(atob(payload));
      setIsAdmin(admin);
    }
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          석준 블로그
        </a>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setIsMenuOpened(!isMenuOpened);
          }}
        >
          Menu
          <i className="fas fa-bars" />
        </button>
        <div
          className={`collapse navbar-collapse ${!isCollapsed && 'show'}`}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item"
              onClick={() => {
                if (isMenuOpened) {
                  setIsCollapsed(!isCollapsed);
                  setIsMenuOpened(!isMenuOpened);
                }
              }}
            >
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => {
                if (isMenuOpened) {
                  setIsCollapsed(!isCollapsed);
                  setIsMenuOpened(!isMenuOpened);
                }
              }}
            >
              {isLoggedIn ? (
                <a className="nav-link" onClick={logout}>
                  로그아웃
                </a>
              ) : (
                <Link className="nav-link" to="/login">
                  로그인
                </Link>
              )}
            </li>
            {isAdmin && (
              <li
                className="nav-item"
                onClick={() => {
                  if (isMenuOpened) {
                    setIsCollapsed(!isCollapsed);
                    setIsMenuOpened(!isMenuOpened);
                  }
                }}
              >
                <Link className="nav-link" to="/write">
                  글 쓰기
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
