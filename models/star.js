'use strict';
module.exports = function(sequelize, DataTypes) {
  var Star = sequelize.define('Star', {
    name: DataTypes.STRING,
    luminosity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Star.belongsTo(models.Constellation);
      }
    }
  });
  return Star;
};
