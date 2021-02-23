import { Link } from 'react-router-dom';
import  HeaderMain from '../../components/HeaderMain/index.js';
import '../../Styles/PedidosProntos.css';
import ListaPedidosProntos from '../../components/ListaPedidosProntos/index.js';

function PedidosProntos() {
  return (
    <div className="">
        <HeaderMain/>
        <p><Link to='/AnotarPedidos'>Anotar Pedidos</Link></p>
        <p><Link to='/PedidosAFazer'>Pedidos Prontos</Link></p>
        <button><Link to='/'>Sair</Link></button>
        <ListaPedidosProntos />
    </div>
  );
}

export default PedidosProntos;
