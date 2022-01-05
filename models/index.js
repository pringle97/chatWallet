<<<<<<< HEAD
const User = require(`./user.js`)
const Post = require('./post.js')

user.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo()
=======
const User = require('./User.js')
const Post = require('./Post.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

module.exports = { User, Post }
>>>>>>> 188559557c9af10da0c08d868c67f59ef727a926
