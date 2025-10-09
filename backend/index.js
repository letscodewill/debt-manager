const {
  listarTodasDividas,
  criarNovaDivida,
  updateDividas,
  deleteDivida
} = require('./controllers/dividaController')

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// Buscar - listarTodasDividas()
app.get('/', (req, res) => {
  try {
    const resultado = listarTodasDividas()
    res.json({
      mensagem: 'Pesquisada concluída.',
      dados: resultado
    })
  } catch (error) {
    console.error('Erro ao processar dívida:', error)
    res.status(500).json({ error: 'Falha interna ao processar dados.' })
  }
})

// Cadastrar - criarNovaDivida
app.post('/cadastrar', (req, res) => {
  try {
    const resultado = criarNovaDivida()
    res.json({
      mensagem: `Dívida cadastrada com sucesso.`,
      dados: resultado
    })
  } catch (error) {
    console.error('Erro ao cadastrar dívida:', error)
    res.status(500).json({ error: 'Falha interna ao processar dados.' })
  }
})

// Update
app.put('/dividas/:id', (req, res) => {
   try {
    const resultado = updateDividas()
    res.json({
      mensagem: `Dívida atualizada com sucesso.`,
      dados: resultado
    })
  } catch (error) {
    console.error('Erro ao atualizar dívida:', error)
    res.status(500).json({ error: 'Falha interna ao processar dados.' })
  }
})

// Delete
app.delete('/dividas/:id', (req, res) => {
  try {
    const resultado = deleteDivida()
    res.json({
      mensagem: `Dívida deletada com sucesso.`,
      dados: resultado
    })
  } catch (error) {
    console.error('Erro ao deletar dívida:', error)
    res.status(500).json({ error: 'Falha interna ao processar dados.' })
  }
})

app.listen(port, () => console.log('Ta up 🚀'))
