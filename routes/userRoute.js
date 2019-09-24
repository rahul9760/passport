const seq = require("../config/config");
var Auth = require("../config/auth");
var jwt = require("jsonwebtoken");
const { User, userInfo} = require('../config/config');
var bcrypt = require("bcryptjs");
var passport = require('passport');


module.exports = function(app) {
 
  
  app.post("/api/create", async (req, res) => {
    User.create({
      name: req.body.name,
      lname: req.body.lname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password)
    }).then(user => {
      res.send(user);
    });
  });
  app.post("/api/Userinfo", async (req, res) => {
    userInfo.create({
        age: req.body.age,
        address: req.body.address,
        phone: req.body.phone,
        country: req.body.country,
        userId: req.body.userId
    }).then(userinfo => {
      
      res.send(userinfo);
    });
  });

  app.post("/api/userLogin", async (req, res) => {
    const data = await User.findAndCountAll({
      where: { email: req.body.email }
    });
    if (data.count === 1) {
      const temp_user = data.rows[0];
      const flag = await bcrypt.compare(req.body.password, temp_user.password);
      if (flag) {
        const user = await User.findByPk(temp_user.id, {
          attributes: { exclude: ["password"] },
          include: [
            {
              model: userInfo
             
            }
          ]
        });
        // const user = await User.findOne({
        //     where: { email: req.body.email },
        //     attributes: { exclude: ["password"] }
        //  });
         const key = ({
           user: "rahul",
           id:1,
           password:"rahul@123"
         })
        const token = jwt.sign({ key }, "secret-key", {
          expiresIn: "0.666667"
        });
        res.json({ status: 200, user: user, accessToken: token });
      } else {
        res.json({ status: 401, message: "invalid password" });
      }
    } else {
      res.send({ status: 404, message: "Record not found" });
    }
  });

 
  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (user === false) {
        res.json('no user found');
      } else {
        res.json('login successful');
      }
    })(req, res, next);
  });

}