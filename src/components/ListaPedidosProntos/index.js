import '../../Styles/CardapioCafeDaManha.css';
import React, { useEffect, useState } from 'react';

const ListaPedidosProntos = () => {
  const tokenUser = localStorage.getItem('token');
  const [PedidosProntos, setPedidosProntos] = useState([]);

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
    })
      .then(response => response.json())
      .then(data => {
        const products = data;
        const pedidosEntregar = products.filter(itens => itens.status.includes('ready'));
        setPedidosProntos(pedidosEntregar)
      })
  }, [])

  const handleEntregar = () => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/'
    const id = produto.id
    console.log(url+id)

    fetch(String(url+id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body: { status : "finished" }
    })
      .then((response) => {
        response.json()
      })  
      .then(data => {
        console.log(data)
      })
  }

  return (
    <div>
      {PedidosProntos.map((pedido) => {
        <table>
          <tbody>
            <tr>
              <th>Pedido nº 00{pedido.id}</th>
              <th>Cliente: {pedido.client_name}</th>
              <th>Mesa: {pedido.table}</th>
            </tr>
            <tr>
              <th>Qtde</th>
              <th>Ítem</th>
              <th>Adicionais</th>
            </tr>
            {pedido.Products.map((itens) => {
              <tr>
                <td>{itens.qtd}</td>
                <td>{itens.name + " " + itens.flavor === 'null' ? '' : itens.flavor}</td>
                <td>{itens.complement === 'null' ? '' : itens.complement}</td>
              </tr>
            })}

            <tr>
              <th><button onClick={() => handleEntregar()}>ENTREGAR</button></th>
            </tr>
          </tbody>
        </table>
      })}
    </div>
  )
};

export default ListaPedidosProntos;