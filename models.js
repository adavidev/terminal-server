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
  usserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Can be both a string representing the table name or a Sequelize model
      key: 'id'
    }
  }
});

User.hasMany(Terminal)
Terminal.hasOne(User)


sequelize.sync(); // Sync the models with the database

module.exports = { User }; // Export your models for use in other parts of your app
