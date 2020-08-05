import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";
import { Link } from "react-router-dom";

export default class ListaProdutos extends Component {
  constructor(props) {
    super(props);
    this.onChangePesquisa = this.onChangePesquisa.bind(this);
    this.buscarProdutos = this.buscarProdutos.bind(this);
    this.atualizarLista = this.atualizarLista.bind(this);
    this.selecionarProduto = this.selecionarProduto.bind(this);
    this.pesquisar = this.pesquisar.bind(this);
    this.acrescentarQtd = this.acrescentarQtd.bind(this);
    this.decrementarQtd = this.decrementarQtd.bind(this);

    this.state = {
      produtos: [],
      produtoAtual: null,
      indiceAtual: -1,
      pesquisa: ""
    };
  }

  componentDidMount() {
    this.buscarProdutos();
  }

  onChangePesquisa(e) {
    const strPesquisa = e.target.value;

    this.setState({
      pesquisa: strPesquisa
    });
  }

  buscarProdutos() {
    ProdutoDataService.getAll()
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  atualizarLista() {
    this.buscarProdutos();
    this.setState({
      produtoAtual: null,
      indiceAtual: -1
    });
  }

  selecionarProduto(produto, indice) {
    this.setState({
      produtoAtual: produto,
      indiceAtual: indice
    });
  }

  pesquisar() {
    ProdutoDataService.find(this.state.pesquisa)
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  acrescentarQtd() {
    this.state.produtoAtual.quantidadeAtual += 1;

    ProdutoDataService.update(
      this.state.produtoAtual.id,
      this.state.produtoAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O produto foi atualizado com sucesso."
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  decrementarQtd() {
    if (this.state.produtoAtual.quantidadeAtual > 0) {
      this.state.produtoAtual.quantidadeAtual -= 1;

      ProdutoDataService.update(
        this.state.produtoAtual.id,
        this.state.produtoAtual
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "O produto foi atualizado com sucesso."
          });
        })
        .catch(e => {
          console.log(e);
        });
      
    }
  }

  render() {
    const { pesquisa, produtos, produtoAtual, indiceAtual } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por nome"
              value={this.pesquisa}
              onChange={this.onChangePesquisa}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.pesquisar}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Produtos</h4>

          <ul className="list-group">
            {produtos &&
              produtos.map((produto, indice) => (
                <li
                  className={
                    "list-group-item " +
                    (indice === indiceAtual ? "active" : (produto.quantidadeAtual < produto.quantidadeMinima ? "list-group-item-danger" : "")) 
                  }
                  onClick={() => this.selecionarProduto(produto, indice)}
                  key={indice}
                >
                  {produto.nome}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {produtoAtual ? (
            <div>
              <h4>Produto</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {produtoAtual.nome}
              </div>
              <div>
                <label>
                  <strong>Quantidade atual:</strong>
                </label>{" "}
                {produtoAtual.quantidadeAtual}

                <button onClick={this.acrescentarQtd} className="btn btn-secondary btn-sm">+</button>

                <button onClick={this.decrementarQtd} className="btn btn-secondary btn-sm">-</button>
              </div>
              <div>
                <label>
                  <strong>Quantidade Mínima:</strong>
                </label>{" "}
                {produtoAtual.quantidadeMinima}
              </div>
              <div>
                <label>
                  <strong>Custo:</strong>
                </label>{" "}
                {produtoAtual.custo}
              </div>
              <div>
                <label>
                  <strong>Preço:</strong>
                </label>{" "}
                {produtoAtual.preco}
              </div>

              <Link
                to={"/produtos/" + produtoAtual.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Clique em um produto...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
