const sequelize = require('../db.js');
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
    type: DataTypes.TEXT,
    allowNull: true
  },
});

const Link = sequelize.define('Link', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

User.hasMany(Terminal)
Terminal.hasOne(User)

Terminal.hasMany(Link)
Link.belongsTo(Terminal)

sequelize.sync(); // Sync the models with the database

module.exports = { User, Terminal, Link }; // Export your models for use in other parts of your app
