import React from 'react';
import '../../../Styles/ModalLogin.css';

function ModalLogin(message) {
  const mensagem = message;

  return (
    <section className="modalDialog">
      <div>
        <a title="Fechar"></a>
      </div>

      <div>
        <p>Preencha todos os campos corretamente {mensagem}</p>
      </div>
    </section>
  );
}

export default ModalLogin;
