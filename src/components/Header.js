import logo from "../images/logo-header.svg";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header section">
      <img className="logo header__logo" src={logo} alt="Логотип" />
      <div className="header__info">
        <span className="header__email">email.mail.mu</span>
        <button
          // onClick={}
          className="button header__link">Выйти</button>
      </div>
      <button
        className="header__menu header__menu_type_closed"
        // onClick={}
      >
        <span/>
      </button>
      
      
      {/* <button className="button header__link" href="#" >Войти</button> */}

    </header>
  );
};

export default Header;