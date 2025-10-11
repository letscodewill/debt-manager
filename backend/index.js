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

app.post('/cadastrar', criarNovaDivida)  
app.get('/', listarTodasDividas)
app.put('/dividas/:id', updateDividas)
app.delete('/dividas/:id', deleteDivida)


app.listen(port, () => console.log('Ta up 🚀'))
