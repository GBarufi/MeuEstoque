import React, { Component } from "react";
import ProdutoDataService from "../services/produto.service";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeQuantidadeAtual = this.onChangeQuantidadeAtual.bind(this);
    this.onChangeQuantidadeMinima = this.onChangeQuantidadeMinima.bind(this);
    this.onChangeCusto = this.onChangeCusto.bind(this);
    this.onChangePreco = this.onChangePreco.bind(this);
    this.getProduto = this.getProduto.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      produtoAtual: {
        id: null,
        nome: "",
        quantidadeAtual: 0,
        quantidadeMinima: 0,
        custo: 0.0,
        preco: 0.0
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduto(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        produtoAtual: {
          ...prevState.produtoAtual,
          nome: nome
        }
      };
    });
  }

  onChangeQuantidadeAtual(e) {
    const quantidadeAtual = e.target.value;
    
    this.setState(prevState => ({
      produtoAtual: {
        ...prevState.produtoAtual,
        quantidadeAtual: quantidadeAtual
      }
    }));
  }

  onChangeQuantidadeMinima(e) {
    const quantidadeMinima = e.target.value;
    
    this.setState(prevState => ({
      produtoAtual: {
        ...prevState.produtoAtual,
        quantidadeMinima: quantidadeMinima
      }
    }));
  }

  onChangeCusto(e) {
    const custo = e.target.value;
    
    this.setState(prevState => ({
      produtoAtual: {
        ...prevState.produtoAtual,
        custo: custo
      }
    }));
  }

  onChangePreco(e) {
    const preco = e.target.value;
    
    this.setState(prevState => ({
      produtoAtual: {
        ...prevState.produtoAtual,
        preco: preco
      }
    }));
  }

  getProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          produtoAtual: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduto() {
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

  deleteProduto() {    
    ProdutoDataService.delete(this.state.produtoAtual.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/produtos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { produtoAtual } = this.state;

    return (
      <div>
        {produtoAtual ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={produtoAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantidadeAtual">Quantidade Atual</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantidadeAtual"
                  value={produtoAtual.quantidadeAtual}
                  onChange={this.onChangeQuantidadeAtual}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantidadeMinima">Quantidade Mínima</label>
                <input
                  type="text"
                  className="form-control"
                  id="quantidadeMinima"
                  value={produtoAtual.quantidadeMinima}
                  onChange={this.onChangeQuantidadeMinima}
                />
              </div>
              <div className="form-group">
                <label htmlFor="custo">Custo</label>
                <input
                  type="text"
                  className="form-control"
                  id="custo"
                  value={produtoAtual.custo}
                  onChange={this.onChangeCusto}
                />
              </div>
              <div className="form-group">
                <label htmlFor="preco">Preço</label>
                <input
                  type="text"
                  className="form-control"
                  id="preco"
                  value={produtoAtual.preco}
                  onChange={this.onChangePreco}
                />
              </div>
            </form>
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduto}
            >
              Excluir
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduto}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um produto...</p>
          </div>
        )}
      </div>
    );
  }
}
