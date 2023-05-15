const { Sequelize } = require('sequelize');
console.log(process.env.DATABASE_URL)

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  },
});

module.exports = sequelize;
