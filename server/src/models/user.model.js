// server/src/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  cardId: {
    type: DataTypes.STRING,
    unique: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;