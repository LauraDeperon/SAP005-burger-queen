import React, { useEffect, useState } from 'react';

function ListaPedidosPendentes() {

  const tokenUser = localStorage.getItem('token');
  const [PedidosAFazer, setPedidosAFazer] = useState([]);

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
    })
      .then(response => response.json())
      .then(pedidos => {
        const pedidosPendentes = pedidos.filter(itens => itens.status.includes('pending'));
        setPedidosAFazer(pedidosPendentes);
      })
  }, [])

  const handlePreparar = () => {

  }

  const handleFinalizar = (produto) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/'
    const id = produto.id
    console.log(url+id)

    fetch(String(url+id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body: { status : "ready" }
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
    {PedidosAFazer.map((pedido) => {
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
              <th><button onClick={() => handlePreparar()}>PREPARAR</button></th>
              <th><button onClick={() => handleFinalizar()}>FINALIZAR</button></th>
            </tr>

          </tbody>
        </table>
      })}
    </div>
  );
}

export default ListaPedidosPendentes;
