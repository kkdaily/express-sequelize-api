'use strict';
module.exports = function(sequelize, DataTypes) {
  var Constellation = sequelize.define('Constellation', {
    name: DataTypes.STRING,
    meaning: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Constellation.hasMany(models.Star);
      }
    }
  });
  return Constellation;
};
