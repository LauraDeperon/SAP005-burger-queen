import React from 'react';
import IconOrder from '../../assets/order.png';
import '../../Styles/PedidosAFazer.css';
import HeaderMain from '../../components/HeaderMain/index.js';
import ListaPedidosPendentes from '../../components/ListaPedidosPendentes/index.js';

function PedidosAFazer() {
  return (
    <div className="page-orders">
      <HeaderMain />
      <section className="container-description">
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2>Pedidos Pendentes</h2>
      </section>
      <ListaPedidosPendentes />
    </div>
  );
}

export default PedidosAFazer;
