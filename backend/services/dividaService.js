const { where } = require('sequelize')
const Divida = require('../models/Divida')

exports.salvarDivida = async dados => {
  try {
    const novaDivida = await Divida.create(dados)
    return novaDivida
  } catch (error) {
    // MUITO IMPORTANTE: Garanta que o Service não está chamando NENHUM res.send/res.json.
    // Apenas relance o erro para o Controller
    throw new Error(`Falha ao salvar a dívida no DB: ${error.message}`)
  }
}

exports.buscarTodasDividas = async () => {
  try {
    const dividas = await Divida.findAll()
    return dividas
  } catch (error) {
    throw new Error(`Falha ao buscar dívidas: ${error.message}`)
  }
}

exports.buscarDividaId = async (id) => {
  try {
    const dividas = await Divida.findAll(id)
    return dividas
  } catch (error) {
    throw new Error(`Falha ao buscar dívidas: ${error.message}`)
  }
}

exports.buscarDividaPorUsuario = async (userId) => {
  try {
    // 3. Use the 'where' clause to filter by the UserId column
    const dividas = await Divida.findAll({
      where: {
        UserId: userId // Ensure this matches your specific DB column name (e.g., userId, user_id, etc.)
      }
    });
    
    return dividas;
  } catch (error) {
    throw new Error(`Falha ao buscar dívidas: ${error.message}`);
  }
};

exports.updateDividas = async (id, dados) => {
  try {
    const dividaAtualizada = Divida.update(
      {
        descricao: dados.descricao,
        valor: dados.valor,
        categoria: dados.categoria,
        data: dados.data
      },
      {
        where: {
          id: id
        }
      }
    )
  } catch (error) {
    throw new Error(`Falha ao atualizar dívida: ${error.message}`)
  }
}

exports.deleteDividas = async id => {
  try {
    const divida = await Divida.destroy({
      where: {
        id: id
      }
    })
  } catch (error) {
    throw new Error(`Falha ao deletar dívida ${error.message}`)
  }
}
