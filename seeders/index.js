require('dotenv').config()

const { User, Post } = require('../models')
const sequelize = require('../db')

async function seeder() {
  await sequelize.sync({ force: true })

  console.log('----Seeding Data----')

  try {
    await User.register(new User({ username: 'malia', email: 'malia@gmail.com' }), 'password1234')
    await User.register(new User({ username: 'garett', email: 'garett@gmail.com' }), 'password4321')
    await User.register(new User({ username: 'haoyang', email: 'haoyang@gmail.com' }), 'rootroot')
    await Post.bulkCreate(require('./postSeed.js'))
  } catch (err) {
    console.log(err)
  }


  console.log('----Data Seeded----')

  process.exit()
}

seeder()