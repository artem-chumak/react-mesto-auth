import React from 'react';
import { Link } from 'react-router-dom';


const MenuMobile = ({ email, isMenuOpen, handleLogout }) => {
  return (
    <div className={
      isMenuOpen
      ? "menu_mobile"
      : "menu_bobile menu_hiden"}>
        <span className="menu__email">{email}</span>
        {/* <button className="button menu__link" onClick={handleLogout}>Выйти</button> */}
        <Link
            to="/sign-in"
            onClick={handleLogout}
            className="button menu__link"
          >
            Выйти
          </Link>
    </div>
  );
}

export default MenuMobile;