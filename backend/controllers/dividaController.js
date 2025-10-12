const dividaService = require('../services/dividaService')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken =  (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(403).json({ message: 'Token not provided' })

  jwt.verify(token, SECRET_KEY, (err, decoded)=>{
    if(err) return res.status(401).json({ message: 'Invalid token'})

      req.userId = decoded.id;
      next()
  })
}

exports.criarNovaDivida = async (req, res) => {
  const dadosDivida = {
    descricao: req.body.descricao,
    valor: req.body.valor,
    categoria: req.body.categoria
  }

  try {
    const novaDivida = await dividaService.salvarDivida(dadosDivida)
    // Use 'return' para garantir que o fluxo de execução pare aqui
    return res.status(201).json({
      // ⬅️ Adicione o 'return' aqui
      mensagem: 'Dívida cadastrada com sucesso!',
      dados: novaDivida
    })
  } catch (error) {
    console.error('Erro ao cadastrar dívida:', error.message)

    // Use 'return' também no catch
    return res.status(500).json({
      // ⬅️ E aqui
      erro: 'Falha interna ao processar o cadastro.',
      detalhes: error.message
    })
  }
}

exports.listarTodasDividas = async (req, res) => {
  try {
    const dividas = await dividaService.buscarTodasDividas()

    res.status(200).json(dividas)
  } catch (error) {
    res.status(500).json({
      erro: 'Falha ao buscar a lista de dívidas',
      detalhes: error.message
    })
  }
}

exports.updateDividas = async (req, res) => {
  const id = req.params.id
  const dadosDivida = {
    descricao: req.body.descricao,
    valor: req.body.valor,
    categoria: req.body.categoria
  }
  try {
    const divida = await dividaService.updateDividas(id, dadosDivida)
    res.status(200).json({
      mensagem: `Update realizado com sucesso no id: ${id}`,
      dados: divida
    })
  } catch (error) {
    console.error('Erro ao listar dívidas:', error.message)
    res.status(500).json({
      erro: 'Falha ao buscar a lista de dívidas',
      detalhes: error.message
    })
  }
}

exports.deleteDivida = async (req, res) => {
  const id = req.params.id

  try {
    const divida = await dividaService.deleteDividas(id)
    res.status(200).json({
      mensagem: `Delete realizado com sucesso no id: ${id}`,
      dados: divida
    })
  } catch (error) {
    console.error('Erro ao deletar dívidas:', error.message)
    res.status(500).json({
      erro: 'Falha ao deletar a dívidas',
      detalhes: error.message
    })
  }
}
