const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");


module.exports.register = async function (req, res) {
  try {
    const condidate = await User.findOne({
      email: req.body.email,
    });

    if (condidate) {
      res.status(409).json({
        message: "This mail already exists",
        resultCode: 409
      });

    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = new User({
        userName: req.body.userName,
        email: req.body.email,
        passwordHash: hash,
        userPhoto: req.body.imgUrl,
      });

     const user = await doc.save();

      const { passwordHash, ...userData } = user._doc;

      res.status(201).json({
         userData,
         message: "You have successfully registered",
         success : true,
         resultCode: 201
      });

    }

  } catch (error) {
    errorHandler(res, error,"Failed to register");
  }
};



module.exports.login = async function (req, res) {
  try {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.passwordHash
      );
      if (passwordResult) {
        const token = jwt.sign(
          {
            _id: candidate._id,
          },
          keys.jwt,
          { expiresIn: "12h" }
        );

        const { passwordHash, ...userData } = candidate._doc;
        res.status(200).json({
          userData,
          token: `Bearer ${token}`,
          resultCode: 200
        });

      } else {
        res.status(401).json({
          message: "Your data is incorrect",
          resultCode: 401,
          success : false
        });
      }
    } else {
      res.status(404).json({
        message: "User is not found",
        resultCode: 404,
        success : false
      });
    }
  } catch (error) {
    errorHandler(res, error,"Failed to login");
  }
};


const checkToken = (req, res, next) => {

  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "Token is not present",
      success : false
    })
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
      jwt.verify(token, keys.jwt, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is  not right..",
        })
      } else {
        req.userId = decoded._id;
        next();
      }
    });
  } else {
 
    return res.json({
      success: false,
      message: "Token is  not right..",
    });
  }
};

module.exports.me = async function (req, res) {
  try {
    checkToken(req, res, async () => {
      const user = await User.findById(req.userId)
      if(!user){
        return res.status(404).json({
          message: 'User not found',
          resultCode : 404,
          success : false,
        })
      }else{
        const { passwordHash, ...userData } = user._doc;
        return res.status(200).json({
          userData,
          resultCode : 200
        })
      }
    });
  } catch (error) {
    errorHandler(res, error, 'No access');
  }
};

module.exports.updateProfilePhoto = async (req, res) => {
  try {
    if (req.file) {
      let update = {
        userPhoto: req.file.path,
      };
      let user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $set: update },
        { new: true }
      );
       await user.save();
       const { passwordHash, ...userData } = user._doc;
      return res.status(200).json({
      userData,
      resultCode : 200
      })
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.updateUserName = async (req, res) => {

  try {
    let update = {
      userName: req.body.userName,
    }

    let user = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: update },
      { new: true }
    )
    await user.save()

    const { passwordHash, ...userData } = user._doc;
    return res.status(200).json({
      userData,
      resultCode : 200
    })

  } catch (e) {
    errorHandler(res, e,);
  }
};
