'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER
  }, {});
  Store.associate = function(models) {
    Store.hasMany(models.Game)
  };
  return Store;
};