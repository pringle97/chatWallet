const User = require('./User.js')
const Post = require('./Post.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { foreignKey: 'uid' })

module.exports = { User, Post }
