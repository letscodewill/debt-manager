const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'financas.sqlite'
})

const Divida = sequelize.define('Divida',{
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        defaultValue: 'Geral'
    }
}, {
    timestamps: true
})

async function syncDatabase() {
    try {
        await sequelize.sync();
        console.log('====================================');
        console.log('Tabela Divida sincronizada.');
        console.log('====================================');
    } catch (error) {
        console.error('Erro ao sincronizar tabela Divida.', error)
    }
}

syncDatabase()

module.exports = Divida