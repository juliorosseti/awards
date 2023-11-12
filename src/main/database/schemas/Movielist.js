const { DataTypes } = require("sequelize");
const sequelize = require("../Database");

const Movielist = sequelize.define("Movielist", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studios: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  producers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  winner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Movielist;
