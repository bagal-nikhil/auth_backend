const express = require("express");
const router = express.Router();
const login = require("./index");
const becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conf = require("../../conf/conf.json");

router.post("/", async (req, res) => {
  try {
    const params = Object.assign({}, req.body);
    const user = await login.checkUserPresent(params.email);
    const becryptedPassword = await becrypt.compare(
      params.password,
      user.password,
    );
    if (becryptedPassword) {
      const token = jwt.sign({ id: user._id }, conf.jwt_secret, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        success: true,
        token,
        message: "Authorized you can login successfully",
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Please enter a correct password",
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Please try again",
    });
  }
});

module.exports = router;
