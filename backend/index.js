require('dotenv').config();
const {
  listarTodasDividas,
  listarDividaId,
  criarNovaDivida,
  updateDividas,
  deleteDivida,
  verifyToken
} = require('./controllers/dividaController')
const cors = require( 'cors');
const express = require('express')
const jwt = require('jsonwebtoken')
const { criarUsuario, listarUsuarios, deteleUsuario, updateUser } = require('./controllers/usersController')
const app = express()
const port = 3000
const User = require('./models/Usuario')
//criar rota de cadastro de usuário  - ok
//criar banco de dados com os usuários- ok
//criar autenticação jwt - ok
//solicitar autenticação em todas as rotas - ok

const SECRET_KEY = process.env.SECRET_KEY;
app.use(express.json())
app.use(cors())
// console.log("SECRET:", SECRET_KEY)
//criar rota de login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    // Busca usuário incluindo campo activated
    const user = await User.findOne({ 
      where: { username },
      attributes: ['id', 'username', 'password', 'activated', 'createdAt']
    })

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Usuário não encontrado' 
      })
    }

    // Verifica se o usuário está ativo
    if (user.activated === false) {
      return res.status(403).json({
        success: false,
        message: 'Usuário desativado. Entre em contato com o administrador.'
      })
    }

    const isValid = await user.validPassword(password)
    if (!isValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Senha incorreta' 
      })
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        role: user.role || 'user'
      },
      SECRET_KEY,
      { expiresIn: '24h' } // Aumentei para 24 horas
    )

    // Remove a senha do objeto antes de retornar
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role || 'user',
      activated: user.activated,
      createdAt: user.createdAt
    }

    res.json({ 
      success: true,
      token,
      user: userResponse
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      success: false,
      message: 'Erro interno no servidor' 
    })
  }
})
//Rotas de usuário
app.post('/inserirUsuario', criarUsuario)

app.use(verifyToken)

app.get('/usuarios', listarUsuarios)
app.delete('/deletarUsuario/:id', deteleUsuario)
app.put('/usuarios/:id', updateUser)

//Rotas de divída
app.post('/cadastrar', criarNovaDivida)
app.get('/', listarTodasDividas)
app.get('/:id', listarDividaId)
app.put('/dividas/:id', updateDividas)
app.delete('/dividas/:id', deleteDivida)


app.listen(port, () => console.log('Ta up 🚀'))
