import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AdicionarProduto from "./components/adicionar-produto.component";
import ListaProdutos from "./components/lista-produtos.component";
import Produto from "./components/produto.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/produtos" className="navbar-brand">
              MeuEstoque
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/produtos"} className="nav-link">
                  Listar
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Adicionar
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/produtos"]} component={ListaProdutos} />
              <Route exact path="/add" component={AdicionarProduto} />
              <Route path="/produtos/:id" component={Produto} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
