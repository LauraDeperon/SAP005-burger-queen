import './ListaPedidosProntos.css';
import React, { useEffect, useState } from 'react';
import IconRefresh from '../../assets/atualizar.png';

const ListaPedidosProntos = () => {
  const tokenUser = localStorage.getItem('token');
  const [PedidosProntos, setPedidosProntos] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const pedidosEntregar = products.filter((itens) =>
          itens.status.includes('ready')
        );
        setPedidosProntos(pedidosEntregar);
      });
  };

  useEffect(() => {
    listaPedidos();
  }, []);

  const handleEntregar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'finished' };

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
      {PedidosProntos.map((pedido) => {
        const dataUpdated = new Date(pedido.updatedAt);
        const dataCreated = new Date(pedido.createdAt);
        const diferença = Math.abs(dataUpdated) - dataCreated;
        const minutes = Math.floor(diferença / 1000 / 60);
        return (
          <section className="container-pending" key={pedido.id}>
            <div className="details-client">
              <p>Pedido nº {pedido.id}</p>
              <p>Mesa: {pedido.table}</p>
              <p>Cliente: {pedido.client_name}</p>
            </div>
            <div className="details-status">
              <h2>Tempo Preparo: </h2>
              <h2>{minutes} min</h2>
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
                className="btn-finalizar"
                onClick={() => handleEntregar(pedido)}
              >
                ENTREGAR
              </button>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default ListaPedidosProntos;

{
  /* <div>
      {PedidosProntos.map((pedido) => {
        const dataUpdated = new Date(pedido.updatedAt);
        const dataCreated = new Date(pedido.createdAt);
        const diferença = Math.abs(dataUpdated) - dataCreated;
        const minutes = Math.floor(diferença / 1000 / 60);
        return (
          <table key={pedido.id}>
            <tbody>
              <tr>
                <th>Pedido nº {pedido.id}</th>
                <th>Cliente: {pedido.client_name}</th>
                <th>Mesa: {pedido.table}</th>
                <th>Tempo: {minutes} min</th>
              </tr>
              <tr>
                <th>Qtde</th>
                <th>Ítem</th>
                <th>Complemento</th>
                <th>Adicionais</th>
              </tr>
              {pedido.Products.map((itens, index) => (
                <tr key={index}>
                  <td>{itens.qtd}</td>
                  <td>{itens.name}</td>
                  <td>{itens.flavor === 'null' ? '' : itens.flavor}</td>
                  <td>{itens.complement === 'null' ? '' : itens.complement}</td>
                </tr>
              ))}
              <tr>
                <th>
                  <button onClick={() => handleEntregar(pedido)}>
                    ENTREGAR
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div> */
}
