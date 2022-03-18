const {
  SERVER_ERROR,
  UNAUTHORİZED,
  USER_NOT_FOUND,
} = require("../constans/messages");

const userModel = require("../models/user.model");
const { generateToken } = require("../helpers/token.helper");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ where: { username, password } });
    if (!user) {
      res.status(401).json({
        //message:messages.USER_NOT_FOUND
        message: USER_NOT_FOUND,
      });
    } else {
      const { username, id, password, name, surname } = user;

      const accesToken = generateToken(
        { username, id, password, name, surname },
        "1m"
      );
      const refreshToken = generateToken(
        { username, id, password, name, surname },
        "2m"
      );

      res.json({
        user: { username, id, name, surname },
        accesToken,
        refreshToken,
      });
      //burada token işlemleri yapıcaz
    }
  } catch (error) {
    console.log("HATA", error);
    res.status(500).json({
      message: SERVER_ERROR,
    });
  }
};

const register = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    const { username, id, password, name, surname } = user;

    const accesToken = generateToken(
      { username, id, password, name, surname },
      "1m"
    );
    const refreshToken = generateToken(
      { username, id, password, name, surname },
      "2m"
    );

    res.json({
      user: { username, id, name, surname },
      accesToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: SERVER_ERROR,
    });
  }
};

module.exports = {
  login,
  register,
};
