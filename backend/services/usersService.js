const { where } = require('sequelize')
const Usuario = require('../models/Usuario')

exports.cadastrarUsuario = async dados => {
    try {
        const novoUsuario = await Usuario.create(dados)
        return novoUsuario
    } catch (error) {
        throw new Error(`Falha ao salvar o novo usuário no DB: ${error.message}`)
    }
}

exports.buscarUsers = async () => {
    try {
        const Usuarios = await Usuario.findAll()
        return Usuarios
    } catch (error) {
        throw new Error(`Falha ao buscar dívida: ${error.message}`)
    }
}

exports.deleteUser = async id => {
  try {
    const user = await Usuario.destroy({
      where: {
        id: id
      }
    })
  } catch (error) {
    throw new Error(`Falha ao deletar usuario ${error.message}`)
  }
}