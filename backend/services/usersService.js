const { where } = require('sequelize')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

exports.cadastrarUsuario = async dados => {
    try {
        const novoUsuario = await Usuario.create(dados)
        console.log('Usuário criado:',novoUsuario.username)
        return novoUsuario
    } catch (error) {
        throw new Error(`Falha ao salvar o novo usuário no DB: ${error.message}`)
    }
}

exports.buscarUsers = async (username) => {
    try {
        const Usuarios = await Usuario.findOne({where: {username}})
        return Usuarios
    } catch (error) {
        throw new Error(`Falha ao buscar usuário: ${error.message}`)
    }
}

exports.buscarAllUsers = async () => {
    try {
        const Usuarios = await Usuario.findAll()
        return Usuarios
    } catch (error) {
        throw new Error(`Falha ao buscar usuário: ${error.message}`)
    }
}

exports.updateUsers = async (id, dados) => {
  try {
    // 1. Busca usuário existente
    const usuarioExistente = await Usuario.findByPk(id)
    if (!usuarioExistente) {
      throw new Error('Usuário não encontrado')
    }

    // 2. Prepara dados
    const dadosAtualizacao = {}
    
    // Campos que podem ser atualizados
    if (dados.username !== undefined) {
      dadosAtualizacao.username = dados.username
    }
    
    if (dados.activated !== undefined) {
      dadosAtualizacao.activated = dados.activated
    }
    
    if (dados.email !== undefined) {
      dadosAtualizacao.email = dados.email
    }
    
    if (dados.name !== undefined) {
      dadosAtualizacao.name = dados.name
    }
    
    if (dados.role !== undefined) {
      dadosAtualizacao.role = dados.role
    }

    // 3. TRATAMENTO ESPECIAL PARA SENHA
    if (dados.password && dados.password.trim() !== '') {
      console.log('Nova senha fornecida')
      
      // Verifica se é uma nova senha (não está hasheada)
      const isPlainPassword = dados.password.length < 50 && !dados.password.startsWith('$2')
      
      if (isPlainPassword) {
        // Verifica se a nova senha é diferente da atual
        const isSamePassword = await bcrypt.compare(dados.password, usuarioExistente.password)
        
        if (!isSamePassword) {
          // Senha diferente, faz novo hash
          const salt = await bcrypt.genSalt(10)
          dadosAtualizacao.password = await bcrypt.hash(dados.password, salt)
          console.log('Nova senha hasheada e salva')
        } else {
          console.log('Senha igual à atual, mantendo hash existente')
          // Não atualiza a senha se for igual
        }
      } else {
        console.log('Senha já hasheada (provavelmente enviada por erro) - não atualizando')
        // Não atualiza se já estiver hasheada
      }
    }

    // 4. Atualiza somente se houver dados para atualizar
    if (Object.keys(dadosAtualizacao).length === 0) {
      console.log('Nenhum dado para atualizar')
      return usuarioExistente
    }

    const [affectedRows] = await Usuario.update(dadosAtualizacao, {
      where: { id: id }
    })

    if (affectedRows === 0) {
      throw new Error('Nenhum registro foi atualizado')
    }

    // 5. Retorna usuário atualizado (sem senha)
    return await Usuario.findByPk(id, {
      attributes: { exclude: ['password'] }
    })

  } catch (error) {
    throw new Error(`Falha ao atualizar usuário: ${error.message}`)
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