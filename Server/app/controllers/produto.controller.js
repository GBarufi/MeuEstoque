const db = require("../models");
const Produto = db.produtos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nome) {
    res.status(400).send({
      message: "'Content' não pode estar vazio."
    });
    return;
  }

  const produto = {
    nome: req.body.nome,
    quantidadeAtual: req.body.quantidadeAtual,
    quantidadeMinima: req.body.quantidadeMinima,
    custo: req.body.custo,
    preco: req.body.preco,
  };

  Produto.create(produto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo deu errado durante a criação do produto."
      });
    });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condicao = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Produto.findAll({ where: condicao })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo deu errado durante a busca de produtos."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Algo deu errado durante a busca do produto de ID " + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Produto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto atualizado com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o produto com ID ${id}. Talvez o produto não tenha sido encontrado`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o produto com ID " + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Produto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto excluído com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível excluir o produto com ID ${id}. Talvez o produto não tenha sido encontrado`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erro ao atualizar o produto com ID " + id
      });
    });
};
