import React from 'react';
import { Link } from 'react-router-dom';
import IconOrder from '../../assets/order.png';
import HeaderMain from '../../components/HeaderMain/index.js';
import ListaPedidos from '../../components/ListaPedidos/index.js';

function PedidosAFazer() {
  return (
    <div className="page-orders">
      <HeaderMain />
      <section className="container-description">
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2>
          <Link to="/PedidosAFazer">Pedidos Pendentes</Link>
        </h2>
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2>
          <Link to="/HistoricoPedidos">Histórico Pedidos</Link>
        </h2>
      </section>
      <ListaPedidos />
    </div>
  );
}

export default PedidosAFazer;
