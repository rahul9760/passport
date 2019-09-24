const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const infoModel = require('../models/userInfo')


const sequelize = new Sequelize('nodeApi', 'root', 'esfera', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize
  .authenticate()
  .then(function() {
    console.log("Database Connected");
  })
  .catch(function(err) {
    console.error("Unable to connect to the database:", err);
  });

const User = UserModel(sequelize, Sequelize)
const userInfo = infoModel(sequelize, Sequelize)
User.hasMany(userInfo);
userInfo.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  userInfo
}