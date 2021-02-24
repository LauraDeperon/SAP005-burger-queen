import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMain from '../../components/HeaderMain/index.js';
import CardapioCafeManha from '../../components/CardapioCafeManha/index';
import '../../Styles/AnotarPedido.css';

function AnotarPedidos() {
  return (
    <div className="">
      <HeaderMain />
      <CardapioCafeManha />
    </div>
  );
}

export default AnotarPedidos;
