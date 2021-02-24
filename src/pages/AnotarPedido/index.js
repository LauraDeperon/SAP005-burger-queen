import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMain from '../../components/HeaderMain/index.js';
import IconOrder from '../../assets/order.png';
import CardapioCafeManha from '../../components/CardapioCafeManha/index';
import '../../Styles/AnotarPedido.css';

function AnotarPedidos() {
  return (
    <div>
      <HeaderMain />
      <section className="container-description">
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2><Link to='/AnotarPedidos'>Anotar Pedidos</Link></h2>
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2><Link to='/PedidosProntos'>Pedidos Prontos</Link></h2>
      </section>
      <CardapioCafeManha />
    </div>
  );
}

export default AnotarPedidos;
