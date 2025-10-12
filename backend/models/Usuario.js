const { Sequelize, Datatypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'users.sqlite'
})

const User = sequelize.define(
    'User',
    {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autIncrement: true
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false
        }
    }
)

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