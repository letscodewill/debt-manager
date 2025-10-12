const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'users.sqlite'
})

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

// 🔒 Hash password before saving
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }
})

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

async function syncUsersDatabase() {
    try {
        await sequelize.sync()
        console.log('====================================')
        console.log('Tabela Users sincronizada.')
        console.log('====================================')
    } catch (error) {
        console.error('Erro ao sincronizar tabela Divida.', error)
    }
}

syncUsersDatabase()

module.exports = User