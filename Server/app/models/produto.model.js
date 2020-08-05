module.exports = (sequelize, Sequelize) => {
  const Produto = sequelize.define("produto", {
    nome: {
      type: Sequelize.STRING
    },
    quantidadeAtual: {
      type: Sequelize.INTEGER
    },
    quantidadeMinima: {
      type: Sequelize.INTEGER
    },
    custo: {
      type: Sequelize.FLOAT
    },
    preco: {
      type: Sequelize.FLOAT
    }
  });

  return Produto;
};
