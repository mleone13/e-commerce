const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
    
  }
);

module.exports = Comment;
