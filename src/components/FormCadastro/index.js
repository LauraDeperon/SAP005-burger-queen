import React, { useState } from 'react';
import Modal from '../ModalCadastro/index.js';
import './FormCadastro.css';

const FormCadastro = () => {
  const [userInfo, setUser] = useState({ restaurant: 'Burger Beef' });
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://lab-api-bq.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        response.json().then(() => {});
        setModalIsVisible(true);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      {modalIsVisible ? <Modal /> : null}
      <section className="form-cadastro">
        <div className="field-cadastro">
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              className="input-text"
              required
              onChange={(event) =>
                setUser({ ...userInfo, name: event.target.value })
              }
            />
          </label>
        </div>

        <div className="field-cadastro">
          <label>
            E-mail:
            <input
              type="text"
              name="email"
              className="input-text"
              required
              onChange={(event) =>
                setUser({ ...userInfo, email: event.target.value })
              }
            />
          </label>
        </div>

        <div className="field-cadastro">
          <label>
            Senha:
            <input
              type="password"
              name="senha"
              className="input-text"
              required
              onChange={(event) =>
                setUser({ ...userInfo, password: event.target.value })
              }
            />
          </label>
        </div>

        <section className="option-setor">
          <label>
            <input
              type="radio"
              value="cozinha"
              name="role"
              className="input-radio"
              required
              onChange={(event) =>
                setUser({ ...userInfo, role: event.target.value })
              }
            />
            Cozinha
          </label>

          <label>
            <input
              type="radio"
              value="salao"
              name="role"
              className="input-radio"
              required
              onChange={(event) =>
                setUser({ ...userInfo, role: event.target.value })
              }
            />
            Salão
          </label>
        </section>

        <button
          type="submit"
          value="enviar"
          className="btn-cadastrar"
          onClick={(event) => handleSubmit(event)}
        >
          CADASTRAR
        </button>
      </section>
    </>
  );
};

export default FormCadastro;
