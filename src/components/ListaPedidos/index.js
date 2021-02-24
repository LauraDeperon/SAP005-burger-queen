import React, { useEffect, useState } from 'react';

function ListaPedidos() {
  const [Pedidos, setPedidos] = useState([]);
  const tokenUser = localStorage.getItem('token');

  const listaPedidos = (tokenUser) => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((pedidos) => {
        setPedidos(pedidos);
      });
  };

  useEffect(() => {
    listaPedidos(tokenUser);
  }, [tokenUser]);

  const handleAtualizar = () => {
    listaPedidos(tokenUser);
  };

  return (
    <div>
      <button onClick={() => handleAtualizar()}>Atualizar Pedidos</button>
      <table>
        <tbody>
          <tr>
            <th>Histórico dos Pedidos</th>
          </tr>
          {Pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>Pedido nº {pedido.id}</td>
              <td>
                Status:{' '}
                {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}
              </td>
            </tr>
          ))}
          ;
        </tbody>
      </table>
    </div>
  );
}

export default ListaPedidos;
