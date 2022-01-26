const User = require('./User');
const Post = require('./Post');
const Response = require('./Response')

Post.belongsTo(User, { 
  foreignKey: 'blogger_id'
})

User.hasMany(Post, { 
  foreignKey: 'blogger_id',
  onDelete: 'CASCADE',
})

Post.hasMany(Response, { 
  foreignKey: 'blog_id', 
  onDelete: "CASCADE"
})

Response.belongsTo(Post, { 
  foreignKey: 'blog_id'
})

module.exports = { User, Post, Response};
