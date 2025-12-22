const userService = require('../services/usersService')

exports.criarUsuario = async (req, res) => {
    const dadosUsuario = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    try {
        const novoUsuario = await userService.cadastrarUsuario(dadosUsuario)
        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            dados: novoUsuario
        })
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message)

        return res.status(500).json({
            erro: 'Falha interna a processar cadastro de usuário.',
            detalhes: error.message
        })
    }
}

exports.listarUsuarios = async (req,res) => {
    try {
        const usuarios = await userService.buscarAllUsers()
        res.status(200).json(usuarios)
    } catch(error){
        res.status(500).json({
            erro: 'Falha ao buscar usuários',
            detalhes: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
  const id = req.params.id
  
  try {
    // Validação
    if (!id) {
      return res.status(400).json({
        erro: 'ID do usuário é obrigatório'
      })
    }

    // Prepara dados (remove campos vazios)
    const dadosUser = {}
    
    if (req.body.username && req.body.username.trim() !== '') {
      dadosUser.username = req.body.username.trim()
    }
    
    if (req.body.password && req.body.password.trim() !== '') {
      // Senha fornecida - será hasheada no service
      dadosUser.password = req.body.password.trim()
    } else if (req.body.password === '') {
      // Senha vazia - remover do objeto para não sobrescrever
      // Não adiciona ao dadosUser
    }
    
    if (req.body.activated !== undefined) {
      dadosUser.activated = req.body.activated
    }
    
    if (req.body.email && req.body.email.trim() !== '') {
      dadosUser.email = req.body.email.trim()
    }
    
    if (req.body.name && req.body.name.trim() !== '') {
      dadosUser.name = req.body.name.trim()
    }
    
    if (req.body.role && req.body.role.trim() !== '') {
      dadosUser.role = req.body.role.trim()
    }

    // Verifica se há dados
    if (Object.keys(dadosUser).length === 0) {
      return res.status(400).json({
        erro: 'Nenhum dado válido fornecido para atualização'
      })
    }

    // Chama service
    const user = await userService.updateUsers(id, dadosUser)

    res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso',
      usuario: user
    })

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.message)
    
    if (error.message.includes('não encontrado')) {
      return res.status(404).json({
        erro: 'Usuário não encontrado'
      })
    }

    res.status(500).json({
      erro: 'Falha ao atualizar usuário',
      detalhes: error.message
    })
  }
}

exports.deteleUsuario = async (req, res) => {
    const id = req.params.id

    try {
        const usuario = await userService.deleteUser(id)
        res.status(200).json({
            mensagem: `Delete de usuário realizado com sucesso. ID: ${id}`,
            dados: usuario
        })
    } catch (error) {
        console.error(`Erro ao deletar usuario: ${error.message} `)
        res.status(500).json({
            erro: `Falha ao deletar usuario`,
            detalhes: error.message
        })
    }
}