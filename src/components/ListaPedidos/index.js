import React, { useEffect, useState } from 'react';
import Trash from '../../assets/trash.png';

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

  // eslint-disable-next-line no-console
  console.log(Pedidos);

  const handleExcluir = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = pedido.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        listaPedidos(tokenUser);
      });
    });
  };

  return (
    <div>
      <button onClick={() => handleAtualizar()}>Atualizar Pedidos</button>
      {Pedidos.map((pedido) => (
        <table key={pedido.id}>
          <tbody>
            <tr>
              <th>Pedido nº {pedido.id}</th>
              <th>
                Status:
                {pedido.status
                  .replace('pending', 'Pendente')
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}
              </th>
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
                <button>
                  <img
                    className="icon-trash"
                    src={Trash}
                    alt="icon-trash"
                    onClick={() => handleExcluir(pedido)}
                  />
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default ListaPedidos;
