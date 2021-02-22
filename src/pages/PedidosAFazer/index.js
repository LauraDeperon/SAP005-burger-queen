import React, { useEffect, useState } from 'react';
import IconOrder from '../../assets/order.png'
import IconClock from '../../assets/clock.png'
import '../../Styles/PedidosAFazer.css';
import HeaderMain from '../../components/HeaderMain/index.js';

function PedidosAFazer() {

  const data = new Date();
 
  function setHorarioPedido() {
    let hour = data.getHours()
    let minutes = data.getMinutes()
    console.log(`${hour}, ${minutes}`)
    return `${hour}h${minutes}`
  }

  const horarioPedido = setHorarioPedido();

  function setHorarioPedidoFinalizado() {
    let hour = data.getHours()
    let minutes = data.getMinutes()
    return `${hour}h${minutes}`
  }

  const horarioPedidoFinalizado = setHorarioPedidoFinalizado();


  return (

    <div className="page-orders">

      <HeaderMain />


      <section className="container-description">
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2>Pedidos</h2>
      </section>

      <section className="orders">

        <h3>Pedido nº 001 </h3>

        <section className="details">

          <div className='container-client'>
            <p>Nome do Cliente: Cliente 1</p>
            <p>Mesa: ##</p>  
          </div>

          <div className='container-hour'>
            <div>
              <img src={IconClock} />
              <p>Horário do Pedido: {horarioPedido}</p>
            </div>
            <div>
              <img src={IconClock} />
              <p>Horário da Finalização: {horarioPedidoFinalizado}</p>
            </div>
          </div>

        </section>

        <table className='itens-order'>
          <tbody>
            <tr>
              <th>Qtde</th>
              <th>Item</th>
              <th>Adicionais</th>
            </tr>
            <tr>
              <td>000</td>
              <td>Nome do Produto</td>
              <td>Complemento</td>
            </tr>
          </tbody>
      </table>

        <div className='buttons'>
          <button className='btn-prepare' onClick={setHorarioPedido} > Preparar Pedido</button>
          <button className='btn-finish'onClick={setHorarioPedidoFinalizado}>Pedido Finalizado</button>
        </div>

      </section>

    </div>
  );
}

export default PedidosAFazer;
