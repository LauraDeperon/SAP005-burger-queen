import { useHistory } from 'react-router-dom';
import React from 'react';
import Logo from '../../assets/Logo_Burger-Beef .png';
import Logout from '../../assets/exit.png';
import './HeaderMain.css';

function HeaderMain() {
  const history = useHistory();

  const user = localStorage.getItem('name');
  const role = localStorage.getItem('role');

  const handleSignOut = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <header>
      <section className="header-main">
        <div className="item-header">
          <img className="logo-main" src={Logo} alt="logo" />
          <div className="item-header2">
            <h2>Bem-vindo(a) {user}!</h2>
            <p>Setor: {role}</p>
          </div>
          <img
            className="icon-logout"
            src={Logout}
            alt="icon-logout"
            onClick={handleSignOut}
          />
        </div>
      </section>
    </header>
  );
}

export default HeaderMain;
