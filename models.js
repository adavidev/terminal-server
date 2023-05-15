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

const Terminal = sequelize.define('Terminal', {
  config: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

User.hasMany(Terminal)
Terminal.hasOne(User)


sequelize.sync(); // Sync the models with the database

module.exports = { User, Terminal }; // Export your models for use in other parts of your app
