const User = require(`./user.js`)
const Post = require('./post.js')

user.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo()