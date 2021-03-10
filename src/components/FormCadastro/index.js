import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalSuccess from '../ModalSucess/index.js';
import ModalError from '../ModalError/index.js';
import './FormCadastro.css';

const FormCadastro = () => {
  const [userInfo, setUser] = useState({ restaurant: 'Burger Beef' });
  const [modalSucessIsVisible, setModalSucessIsVisible] = useState(false);
  const [modalErrorIsVisible, setModalErrorIsVisible] = useState(false);
  const [modalErrorIsVisible403, setModalErrorIsVisible403] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://lab-api-bq.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    }).then((response) => {
      response.json().then((data) => {
        if (data.code === 400) {
          setModalErrorIsVisible(true);
        } else if (data.code === 403) {
          setModalErrorIsVisible403(true);
        } else {
          setModalSucessIsVisible(true);
        }
      });
    });
  };

  return (
    <>
      {modalSucessIsVisible ? (
        <ModalSuccess onClose={() => setModalSucessIsVisible(false)}>
          <h3>Usuário Criado com Sucesso!</h3>
        </ModalSuccess>
      ) : null}
      {modalErrorIsVisible ? (
        <ModalError onClose={() => setModalErrorIsVisible(false)}>
          <h3>Preencha todos os campos!</h3>
        </ModalError>
      ) : null}
      {modalErrorIsVisible403 ? (
        <ModalError onClose={() => setModalErrorIsVisible403(false)}>
          <h3>E-mail já cadastrado!</h3>
        </ModalError>
      ) : null}
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
      <h3>
        Se já possui cadastro, clique <Link to="/">AQUI</Link> para fazer Login!
      </h3>
    </>
  );
};

export default FormCadastro;
