import "../../Styles/CardapioCafeDaManha.css";
import Trash from "../../assets/trash.png";
import Check from "../../assets/check.png"
import React, { useEffect, useState } from "react";
import Footer from '../Footer/index.js'

const CardapioCafeManha = () => {
  const tokenUser = localStorage.getItem("token");
  const [CardapioCafe, setCardapioCafe] = useState([]);
  const [hamburgueres, setHamburgueres] = useState([]);
  const [acompanhamentos, setAcompanhamentos] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [resumoPedido, setResumoPedido] = useState([]);
  const [order, setOrder] = useState({});
  const [produtoExcluído, setProdutoExcluído] = useState([]);
  const [precoTotal, setPrecoTotal] = useState([0]);
  const [precosProdutos, setPrecosProdutos] = useState([0]);

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenUser}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const produtosCafe = products.filter((itens) =>
          itens.type.includes("breakfast")
        );
        setCardapioCafe(produtosCafe);
        const hamburgueres = products.filter((itens) =>
          itens.sub_type.includes("hamburguer")
        );
        setHamburgueres(hamburgueres);
        const acompanhamentos = products.filter((itens) =>
          itens.sub_type.includes("side")
        );
        setAcompanhamentos(acompanhamentos);
        const bebidas = products.filter((itens) =>
          itens.sub_type.includes("drinks")
        );
        setBebidas(bebidas);
      });
  }, []);

  const handleAdicionar = (produto) => {
    setResumoPedido([...resumoPedido, produto]);
    setPrecosProdutos([...precosProdutos, produto.price]);
    const produtoApi = resumoPedido.map((produto) => {
      return {
        id: produto.id,
        qtd: 1,
      };
    });

    const qtd = produtoApi.reduce(function (r, a) {
      r[a.id] = r[a.id] || [];
      r[a.id].push(a);
      return r;
    }, Object.create(null));

    const arrayProdutos = [];
    for (const [key, value] of Object.entries(qtd)) {
      arrayProdutos.push({
        id: key,
        qtd: value.length,
      });
    }
    setOrder({ ...order, products: arrayProdutos });
  };

  useEffect(() => {
    Somar()
  }, [precosProdutos])

  const handleExcluir = (produto) => {
    setPrecoTotal(precosProdutos.splice(resumoPedido.indexOf(produto), 1));
    setProdutoExcluído(resumoPedido.splice(resumoPedido.indexOf(produto), 1));
    Somar();
  };

  const Somar = () => {
    setPrecoTotal(precosProdutos.reduce((total, num) => total + num));
  };

  const handleSubmit = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenUser}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setOrder({});
          setResumoPedido([]);
          setPrecoTotal([]);
          setPrecosProdutos([]);
          setProdutoExcluído([]);
          clearInput();
          alert("Pedido Criado com Sucesso!");
        });
      })
      .catch(() => {
        alert("Preencha todos os campos!");
      });
  };

  const clearInput = () => {
    const inputs = document.querySelectorAll("input");
    [].map.call(inputs, (entrada) => (entrada.value = ""));
  }

  return (

    <div className="main">

      <section className="order-info">

        <div className="info-client">

          <label>
            Nome do cliente:
            <input
              type='text'
              name='nome'
              className='input'
              required
              onChange={(event) =>
                setOrder({ ...order, client: event.target.value })
              }
            />
          </label>

          <label>
            Mesa:
            <input
              type='text'
              name='mesa'
              className='input'
              required
              onChange={(event) =>
                setOrder({ ...order, table: event.target.value })
              }
            />
          </label>

        </div>

        <div className='container-resum'>

          <h2>Resumo do Pedido</h2>
          <div className="resum-itens">

            {resumoPedido.map((produto, index) => (
              <div className="details-order" key={index}>
                <p><b>Produto:</b> {produto.name}</p>
                <p><b>Quantidade:</b> 1</p>
                <p><b>Complemento:</b>{produto.flavor === "null" ? "" : produto.flavor}</p>
                <p><b>Adicionais:</b>{produto.complement === "null" ? "" : produto.complement}</p>
                <p><b>Valor:</b>R$ {produto.price},00</p>

                <div>
                  <button className="btn-delete">
                    <img
                      className="icon-trash"
                      src={Trash}
                      alt="icon-trash"
                      onClick={() => handleExcluir(produto)}
                    />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </section>

      <section className="container-total">

        <div className="item-total">
          <h4>Total: R$ {precoTotal},00</h4>
        </div>

        <div className="item-total">
          <button className="btn-finalizar" onClick={() => handleSubmit()}><img src={Check} />ENVIAR PEDIDO</button>
        </div>

      </section>

      <h2>CAFÉ DA MANHÃ:</h2>

      <section className="container-menu">
        {CardapioCafe.map((produto) => (

          <div className="itens-menu" key={produto.id}>

            <h3>{produto.name}</h3>
            <img src={produto.image} />
            <p>Preço: R$ {produto.price},00</p>
            <button className='btn-add-item' onClick={() => handleAdicionar(produto)}>+</button>
          </div>

        ))}
      </section>

      <h2>HAMBÚRGUERES:</h2>

      <section className="container-menu">
        {hamburgueres.map((produto) => (

          <div className="itens-menu" key={produto.id}>

            <h3>{produto.name + " " + produto.flavor}</h3>
            <img src={produto.image} />
            <p>Categoria: {produto.name}</p>
            <p>Adicional: {produto.complement === "null" ? "" : produto.complement}</p>
            <p>Preço: R$ {produto.price},00</p>
            <button className='btn-add-item' onClick={() => handleAdicionar(produto)}>+</button>
          </div>

        ))}
      </section>

      <h2>ACOMPANHAMENTOS:</h2>

      <section className="container-menu">
        {acompanhamentos.map((produto) => (

          <div className="itens-menu" key={produto.id}>

            <h3>{produto.name}</h3>
            <img src={produto.image} />
            <p>Categoria: {produto.name}</p>
            <p>Preço: R$ {produto.price},00</p>
            <button className='btn-add-item' onClick={() => handleAdicionar(produto)}>+</button>
          </div>

        ))}
      </section>

      <h2>BEBIDAS:</h2>

      <section className="container-menu">
        {bebidas.map((produto) => (

          <div className="itens-menu" key={produto.id}>

            <h3>{produto.name}</h3>
            <img src={produto.image} />
            <p>Preço: R$ {produto.price},00</p>
            <button className='btn-add-item' onClick={() => handleAdicionar(produto)}>+</button>
          </div>

        ))}
      </section>

      <Footer />

    </div>
  );
};

export default CardapioCafeManha;
