const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

const Blog = require("./blog.model");

class User extends Model {}

User.init(
  {
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, 
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, 
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, 
      surname: {
        type: DataTypes.TEXT,
        allowNull: false,
      }, 
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      }, 
  },

  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

User.hasMany(Blog,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

sequelize.sync();
//sequelize.sync({force:true});



module.exports = User;
