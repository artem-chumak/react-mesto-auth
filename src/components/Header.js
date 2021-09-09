import logo from "../images/logo-header.svg";

const Header = () => {
  return (
    <header className="header section">
      <img className="logo header__logo" src={logo} alt="Логотип" />
    </header>
  );
};

export default Header;
