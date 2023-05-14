const sequelize = require('./db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Add more model definitions as needed

sequelize.sync(); // Sync the models with the database

module.exports = { User }; // Export your models for use in other parts of your app
