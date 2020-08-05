import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class AdicionarProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeQuantidadeAtual = this.onChangeQuantidadeAtual.bind(this);
    this.onChangeQuantidadeMinima = this.onChangeQuantidadeMinima.bind(this);
    this.onChangeCusto = this.onChangeCusto.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.salvarProduto = this.salvarProduto.bind(this);
    this.novoProduto = this.novoProduto.bind(this);

    this.state = {
      id: null,
      nome: "",
      quantidadeAtual: 0,
      quantidadeMinima: 0,
      custo: 0.0,
      preco: 0.0,

      submitted: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeQuantidadeAtual(e) {
    this.setState({
      quantidadeAtual: e.target.value
    });
  }

  onChangeQuantidadeMinima(e) {
    this.setState({
      quantidadeMinima: e.target.value
    });
  }

  onChangeCusto(e) {
    this.setState({
      custo: e.target.value
    });
  }

  onChangePreco(e) {
    this.setState({
      preco: e.target.value
    });
  }

  salvarProduto() {
    var data = {
      nome: this.state.nome,
      quantidadeAtual: this.state.quantidadeAtual,
      quantidadeMinima: this.state.quantidadeMinima,
      custo: this.state.custo,
      preco: this.state.preco
    };

    ProdutoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          quantidadeAtual: response.data.quantidadeAtual,
          quantidadeMinima: response.data.quantidadeMinima,
          custo: response.data.custo,
          preco: response.data.preco,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  novoProduto() {
    this.setState({
      id: null,
      nome: "",
      quantidadeAtual: 0,
      quantidadeMinima: 0,
      custo: 0.0,
      preco: 0.0,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Produto cadastrado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.novoProduto}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidadeAtual">Quantidade Atual</label>
              <input
                type="text"
                className="form-control"
                id="quantidadeAtual"
                required
                value={this.state.quantidadeAtual}
                onChange={this.onChangeQuantidadeAtual}
                name="quantidadeAtual"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidadeMinima">Quantidade Mínima</label>
              <input
                type="text"
                className="form-control"
                id="quantidadeMinima"
                required
                value={this.state.quantidadeMinima}
                onChange={this.onChangeQuantidadeMinima}
                name="quantidadeMinima"
              />
            </div>

            <div className="form-group">
              <label htmlFor="custo">Custo</label>
              <input
                type="text"
                className="form-control"
                id="custo"
                required
                value={this.state.custo}
                onChange={this.onChangeCusto}
                name="custo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço</label>
              <input
                type="text"
                className="form-control"
                id="preco"
                required
                value={this.state.preco}
                onChange={this.onChangePreco}
                name="preco"
              />
            </div>

            <button onClick={this.salvarProduto} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
