import React, { useEffect, useState } from 'react';

function ListaPedidosPendentes() {

  const tokenUser = localStorage.getItem('token');
  const [PedidosAFazer, setPedidosAFazer] = useState([]);

  const listaPedidos = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
    })
      .then(response => response.json())
      .then(pedidos => {
        const pedidosPendentes = pedidos.filter(itens => itens.status.includes('pending'))
        setPedidosAFazer(pedidosPendentes);
      })
 
  }

  useEffect(() => {
    listaPedidos()
  }, [])

  const handleAtualizar = () => {
    listaPedidos()
  }

  const handlePreparar = (e) => {
    const btnPreparar = e.target.parentNode.querySelector('.btn-preparar')
    btnPreparar.classList.add('none')
  }

  const handleFinalizar = (pedido) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/'
    const id = pedido.id
    const status = { "status": "ready" }

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
      body: JSON.stringify(status)
    })
      .then((response) => {
        response.json()
        .then((data) => {
          console.log(data)
        })
        listaPedidos()
      })
      
  }

  return (
    <div>
      <button onClick={() => handleAtualizar()}>Atualizar Pedidos</button>
      {PedidosAFazer.map((pedido) => {
        return (
          <table key={pedido.id}>
            <tbody>
              <tr>
                <th>Pedido nº {pedido.id}</th>
                <th>Cliente: {pedido.client_name}</th>
                <th>Mesa: {pedido.table}</th>
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
              <tr >
                <th><button className='btn-preparar' onClick={(e) => handlePreparar(e)}>PREPARAR</button></th>
                <th><button onClick={() => handleFinalizar(pedido)}>FINALIZAR</button></th>
              </tr>
            </tbody>
          </table>
        )
      })}
    </div>
  );
}

export default ListaPedidosPendentes;