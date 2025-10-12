const {
  listarTodasDividas,
  criarNovaDivida,
  updateDividas,
  deleteDivida,
  verifyToken
} = require('./controllers/dividaController')

const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()
const port = 3000

const users =[{id: 1, username: 'willian', password: bcrypt.hashSync('123456', 8)}]
const SECRET_KEY = 'my_secret_key'

app.use(express.json())


//criar rota de login
app.post('/login', (req,res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)

  if(!user) return res.status(401).json({ message: 'User not found'})

  const passwordIsValid = bcrypt.compareSync(password, user.password)
  if (!passwordIsValid) return res.status(401).json({message: "Invalid password"})

  const token = jwt.sign({id: user.id }, SECRET_KEY, { expiresIn: "1h"})
  res.json({ token })
})
//criar rota de cadastro de usuário
//criar banco de dados com os usuários
//criar autenticação jwt
//solicitar autenticação em todas as rotas
app.use(verifyToken)

app.post('/cadastrar', criarNovaDivida)  
app.get('/', listarTodasDividas)
app.put('/dividas/:id', updateDividas)
app.delete('/dividas/:id', deleteDivida)


app.listen(port, () => console.log('Ta up 🚀'))
