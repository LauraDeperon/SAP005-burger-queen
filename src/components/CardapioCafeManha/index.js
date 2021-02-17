import '../../Styles/CardapioCafeDaManha.css';
import Trash from '../../assets/trash.png';
import React, { useEffect, useState } from 'react';


const CardapioCafeManha = () => {
  const tokenUser = localStorage.getItem('token');
  // const [clientInfo, setClientInfo] = useState({});
  const [CardapioCafe, setCardapioCafe] = useState([]);
  const [hamburgueres, setHamburgueres] = useState([]);
  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  console.log(CardapioCafe, hamburgueres, acompanhamentos, bebidas, produtos)

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenUser}`
      },
    })
      .then(response => response.json())
      .then(data => {
        const products = data;
        const produtosCafe = products.filter(itens => itens.type.includes('breakfast'));
        setCardapioCafe(produtosCafe);
        const hamburgueres = products.filter(itens => itens.sub_type.includes('hamburguer'));
        setHamburgueres(hamburgueres);
        const acompanhamentos = products.filter(itens => itens.sub_type.includes('side'));
        setAcompanhamentos(acompanhamentos);
        const bebidas = products.filter(itens => itens.sub_type.includes('drinks'));
        setBebidas(bebidas);
      })
  }, [])

  const handleAdicionar = (produto) => {
    const produtoAdd = produto
    const resumoProduto = produtoAdd

    const divResumo = document.getElementsByClassName('resumo')
    console.log(divResumo)
    console.log(resumoProduto)
    console.log(produtoAdd + " resumo")
  }

  console.log(handleAdicionar("oioioi"))



  // const handleSubmit = () => {

  //   fetch('https://lab-api-bq.herokuapp.com/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(clientInfo)
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       const order = data;
  //       console.log(order)
  //     })
  // }

  return (
    <div>

      <div className='info-client'>
        <label>
          Nome:
            <input type='text' name='nome' className='' required /*onChange={(event) => setClientInfo({ 'client': event.target.value })
          }*/ />
        </label>
        <label>
          Mesa:
            <input type='text' name='mesa' className='' required /*onChange={(event) => setClientInfo({ 'table': event.target.value })
          }*/ />
        </label>
      </div>


      <table className='itens'>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Preço</th>
          </tr>
          {CardapioCafe.map((produto) => (
            <tr key={produto.id}>
              <td >{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={(event) => handleAdicionar(produto.name)} > + </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <table className='itens'>
        <tbody>
          <tr>
            <th>Hambúrgueres</th>
            <th>Adicionais</th>
            <th>Preço</th>
          </tr>
          {hamburgueres.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name + " " + produto.flavor}</td>
              <td>{produto.complement === 'null' ? '' : produto.complement}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={(event) => handleAdicionar(produto.name)} > + </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      <table className='itens'>
        <tbody>
          <tr>
            <th>Acompanhamentos</th>
            <th>Preço</th>
          </tr>
          {acompanhamentos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.name}</td>
              <td>R$ {produto.price},00</td>
              <td>
                <button onClick={(event) => handleAdicionar(produto.name)}> + </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='itens'>
        <table>
          <tbody>
            <tr>
              <th>Bebidas</th>
              <th>Preço</th>
            </tr>
            {bebidas.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.name}</td>
                <td>R$ {produto.price},00</td>
                <td>
                  <button onClick={(event) => handleAdicionar(produto.name)}> + </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="resum">

        <div>
          <h5>Resumo do Pedido</h5>
          <div ><p className="resumo" value="teste">{produtos.name}</p></div>
        </div>

        <table>
          <tbody className='resumo'>

            <tr>
              <th><h4>Item</h4></th>
              <th><h4>Preço</h4></th>
               {/* {CardapioDia.map((produto, tokenUser) => ( */}
              <th>
                <button><img className='icon-trash' src={Trash} alt='icon-trash' /></button>
              </th>
            </tr>

              {/* ))} */}
              <tr class='total'>
                <th className='item-total'><h4>Total:</h4></th>
                <th className='item-total'><h4>R$ 0,00</h4></th>
              </tr>

          </tbody>
        </table>

      </section>

    </div>
  )
};

export default CardapioCafeManha;
