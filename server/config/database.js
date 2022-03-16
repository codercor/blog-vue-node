const { Sequelize } = require('sequelize');

//.env içerisinden aldığımız değerler
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

console.log(DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST );

//bağlantı nesnemiz
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect:  'mysql'
  });

module.exports = sequelize;