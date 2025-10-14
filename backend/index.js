require('dotenv').config();
const {
  listarTodasDividas,
  listarDividaId,
  criarNovaDivida,
  updateDividas,
  deleteDivida,
  verifyToken
} = require('./controllers/dividaController')

const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { criarUsuario, listarUsuarios, deteleUsuario } = require('./controllers/usersController')
const userService = require('../backend/services/usersService')
const app = express()
const port = 3000
const User = require('./models/Usuario')
//criar rota de cadastro de usuário  - ok
//criar banco de dados com os usuários- ok
//criar autenticação jwt - ok
//solicitar autenticação em todas as rotas - ok

const SECRET_KEY = process.env.SECRET_KEY;
app.use(express.json())


//criar rota de login
app.post('/login', async (req, res) => {
try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })

    if (!user) return res.status(401).json({ message: 'User not found' })

    const isValid = await user.validPassword(password)
    if (!isValid) return res.status(401).json({ message: 'Invalid password' })

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    res.json({ token })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})
//Rotas de usuário
app.post('/inserirUsuario', criarUsuario)

app.use(verifyToken)

app.get('/usuarios', listarUsuarios)
app.delete('/deletarUsuario/:id', deteleUsuario)

//Rotas de divída
app.post('/cadastrar', criarNovaDivida)
app.get('/', listarTodasDividas)
app.get('/:id', listarDividaId)
app.put('/dividas/:id', updateDividas)
app.delete('/dividas/:id', deleteDivida)


app.listen(port, () => console.log('Ta up 🚀'))
