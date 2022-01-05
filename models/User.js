const pls = require('passport-local-sequelize')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = pls.defineUser(sequelize, {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  chatrooms: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

module.exports = User