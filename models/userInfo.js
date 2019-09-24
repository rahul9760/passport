"use strict";
module.exports = (sequelize, DataTypes) => {
  const userInfo = sequelize.define("userInfo", {
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING
  });



  userInfo.associate = models => {
    userInfo.belongsTo(models.user, {
      onDelete: "CASCADE"
    });
  };

  userInfo.sync().then(data => {
    userInfo.create;
  });
  return userInfo;
};

