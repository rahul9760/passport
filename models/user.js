// 'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    name: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  });

  user.associate = models => {
   
    user.hasMany(models.userInfo, {
      onDelete: "CASCADE"
    });
  };

  user.sync().then(() => {
    user.create;
  });

  return user;
};
