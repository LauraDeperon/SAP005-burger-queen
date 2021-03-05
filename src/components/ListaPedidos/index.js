import React, { useEffect, useState } from 'react';
import Trash from '../../assets/trash.png';
import IconRefresh from '../../assets/atualizar.png';
import '../ListaPedidosPendentes/ListaPedidosPendentes.css';
import './ListaPedidos.css';

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
    <main className="page">
      <button className="btn-refresh" onClick={() => handleAtualizar()}>
        <img alt="icone-atualizar" src={IconRefresh} />
        Atualizar Pedidos
      </button>
      {Pedidos.map((pedido) => {
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
                  .replace('ready', 'Pronto')
                  .replace('finished', 'Finalizado')
                  .replace('preparing', 'Preparando')}
              </h2>
            </div>
            <section className="container-order scroll">
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
              <button className="btn-delete">
                <img
                  className="icon-trash"
                  src={Trash}
                  alt="icon-trash"
                  onClick={() => handleExcluir(pedido)}
                />
              </button>
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default ListaPedidos;

// <div>
//   <button onClick={() => handleAtualizar()}>Atualizar Pedidos</button>
//   {Pedidos.map((pedido) => (
//     <table key={pedido.id}>
//       <tbody>
//         <tr>
//           <th>Pedido nº {pedido.id}</th>
//           <th>
//             Status:
//             {pedido.status
//               .replace('pending', 'Pendente')
//               .replace('ready', 'Pronto')
//               .replace('finished', 'Finalizado')
//               .replace('preparing', 'Preparando')}
//           </th>
//         </tr>
//         <tr>
//           <th>Qtde</th>
//           <th>Ítem</th>
//           <th>Complemento</th>
//           <th>Adicionais</th>
//         </tr>

//         {pedido.Products.map((itens, index) => (
//           <tr key={index}>
//             <td>{itens.qtd}</td>
//             <td>{itens.name}</td>
//             <td>{itens.flavor === 'null' ? '' : itens.flavor}</td>
//             <td>{itens.complement === 'null' ? '' : itens.complement}</td>
//           </tr>
//         ))}
//         <tr>
//           <th>
//             <button>
//               <img
//                 className="icon-trash"
//                 src={Trash}
//                 alt="icon-trash"
//                 onClick={() => handleExcluir(pedido)}
//               />
//             </button>
//           </th>
//         </tr>
//       </tbody>
//     </table>
//   ))}
// </div>
