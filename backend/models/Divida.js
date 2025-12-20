const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'financas.sqlite'
})

const Divida = sequelize.define(
  'Divida',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // <--- ISSO É CRUCIAL!
    },
    // Seus campos existentes
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
    ,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    ,
    data: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
)

async function syncDatabase() {
  try {
    await sequelize.sync()
    console.log('====================================')
    console.log('Tabela Divida sincronizada.')
    console.log('====================================')
  } catch (error) {
    console.error('Erro ao sincronizar tabela Divida.', error)
  }
}

syncDatabase()

module.exports = Divida
