const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        //ilişkisel olacak
    },
    coverImage:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    categoryId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Blog", // We need to choose the model name
  }
);

//sequelize.sync({force:true});

module.exports = Blog;