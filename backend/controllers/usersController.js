const userService = require('../services/usersService')

exports.criarUsuario = async (req, res) => {
    const dadosUsuario = {
        username: req.body.username,
        password: req.body.password
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