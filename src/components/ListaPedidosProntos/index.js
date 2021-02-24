import '../../Styles/CardapioCafeDaManha.css';
import React, { useEffect, useState } from 'react';

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
    <div>
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
    </div>
  );
};

export default ListaPedidosProntos;
