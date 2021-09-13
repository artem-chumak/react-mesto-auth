import React from 'react';

const MenuMobile = ({ email, isShowMenu, signOut }) => {
  return (
    <div className="menu_mobile">
        <span className="menu__email">{email}email@email.mu</span>
        <button className="button menu__link" onClick={signOut}>Выйти</button>
    </div>
  );
}

export default MenuMobile;