import React from 'react';
import { Link } from 'react-router-dom';
import './ModalCadastro.css';

function ModalCadastro() {
  return (
    <section className="modalDialog">
      <div className="body-modal">
        <h4>Usuário Criado com Sucesso!</h4>
        <a>
          <Link className="link-login" to="/">
            {' '}
            Clique AQUI para fazer Login{' '}
          </Link>
        </a>
      </div>
    </section>
  );
}

export default ModalCadastro;
