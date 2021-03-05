import React, { useEffect, useState } from 'react';
import IconRefresh from '../../assets/atualizar.png';
import './ListaPedidosPendentes.css';

function ListaPedidosPendentes() {
  const tokenUser = localStorage.getItem('token');
  const [PedidosAFazer, setPedidosAFazer] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((pedidos) => {
        const pedidosPendentes = pedidos.filter(
          (itens) =>
            itens.status.includes('preparing') ||
            itens.status.includes('pending')
        );
        setPedidosAFazer(pedidosPendentes);
      });
  };

  useEffect(() => {
    listaPedidos();
  }, []);

  const handleAtualizar = () => {
    listaPedidos();
  };

  const handlePreparar = (pedido, e) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'preparing' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos();
      });
    });
  };

  const handleFinalizar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos();
      });
    });
  };

  return (
    <main className="page">
      <button className="btn-refresh" onClick={() => handleAtualizar()}>
        <img alt="icone-atualizar" src={IconRefresh} />
        Atualizar Pedidos
      </button>
      {PedidosAFazer.map((pedido) => {
        return (
          <section className="container-pending" key={pedido.id}>
            <div className="details-client">
              <p>Pedido nº {pedido.id}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Cliente: {pedido.client_name}</p>
            </div>
            <div className="details-status">
              <h2>Status:</h2>
              <h2>
                {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('preparing', 'Preparando')}
              </h2>
            </div>
            <section className="container-order">
              {pedido.Products.map((itens, index) => (
                <div className="details-order-pending" key={index}>
                  <p>
                    {' '}
                    {itens.qtd} {itens.name}
                  </p>
                  <p>{itens.flavor === 'null' ? '' : itens.flavor}</p>
                  <p>{itens.complement === 'null' ? '' : itens.complement}</p>
                </div>
              ))}
            </section>
            <div>
              <button
                className="btn-preparar"
                onClick={(e) => handlePreparar(pedido, e)}
              >
                PREPARAR
              </button>
              <button
                className="btn-finalizar"
                onClick={() => handleFinalizar(pedido)}
              >
                FINALIZAR
              </button>
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default ListaPedidosPendentes;
