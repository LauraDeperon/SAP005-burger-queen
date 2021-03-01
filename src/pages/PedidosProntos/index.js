import { Link } from 'react-router-dom';
import IconOrder from '../../assets/order.png';
import HeaderMain from '../../components/HeaderMain/index.js';
import '../../Styles/PedidosProntos.css';
import ListaPedidosProntos from '../../components/ListaPedidosProntos/index.js';

function PedidosProntos() {
  return (
    <div className="">
      <HeaderMain />
      <section className="container-description">
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2>
          <Link to="/AnotarPedidos">Anotar Pedidos</Link>
        </h2>
        <img src={IconOrder} alt="icon-order" className="icon-order"></img>
        <h2>
          <Link to="/PedidosProntos">Pedidos Prontos</Link>
        </h2>
      </section>
      <ListaPedidosProntos />
    </div>
  );
}

export default PedidosProntos;
