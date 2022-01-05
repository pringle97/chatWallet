//possibly don't need, not sure
const pls = require('passport-local-sequelize')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = pls.defineUser(sequelize, {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User