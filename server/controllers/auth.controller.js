const jwt = require("jsonwebtoken");
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

      const accessToken = generateToken(
        { username, id, password, name, surname },
        "10m"
      );
      const refreshToken = generateToken(
        { username, id, password, name, surname },
        "15m"
      );

      res.json({
        user: { username, id, name, surname },
        accessToken,
        refreshToken,
      });
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

const check = async (req, res) => {
  const accessToken = req.headers["access-token"]; //header'dan gelen access-token
  const refreshToken = req.headers["refresh-token"]; //header'dan gelen refresh-token
  if (!accessToken) res.status(401).json({ message: UNAUTHORİZED }); // accessToken yoksa 401 döndür
  if (!refreshToken) res.status(401).json({ message: UNAUTHORİZED }); // refreshToken yoksa 401 döndür
  else { //accessToken ve refreshToken varsa
    try {
      const accessDecoded = jwt.verify( //accessToken'ın geçerli olup olmadığını kontrol et
        accessToken,
        process.env.TOKEN_PRIVATE_KEY
      );
      //accessToken geçerli ise
      const exp = new Date(accessDecoded.exp * 1000); //accessToken'ın expire tarihini milisaniye cinsinden al
      //var iat = new Date(decoded.iat * 1000);
      const now = new Date(); //şu anki tarih 
      var difference = exp.getTime() - now.getTime(); //şu anki tarih ile expire tarihi arasındaki fark
      var resultInMinutes = Math.round(difference / 60000); //farkı milisaniye cinsinden al ve dakika cinsinden hesapla
      if (resultInMinutes < 5) { //5 dakikadan az ise kalan süresi
        const newAccessToken = generateToken({ ...accessDecoded }, "10m");
        const newRefreshToken = generateToken({ ...accessDecoded }, "15m");
        //accessToken'ı ve refreshToken'ı yeniden oluştur
        res.json({
          accesToken: newAccessToken,
          refreshToken: newRefreshToken,
          refreshed: true, //tokenlar'ın yeniden oluşturulduğunu client'a bildirmek için refreshed:true ifadesini ekledik
        });
      } else { //5 dakikadan fazla ise
        res.json({ //accessToken'ı ve refreshToken'ı yeniden oluştmaya gerek yok
          refreshed: false,
        });
      }
    } catch (error) { //accessToken geçersiz ise
      try {
        //refreshToken'ın geçerli olup olmadığını kontrol et
        const refreshDecoded = jwt.verify(
          refreshToken,
          process.env.TOKEN_PRIVATE_KEY
        );
        //refreshToken geçerli ise
        const newAccessToken = generateToken({ ...refreshDecoded }, "10m");
        const newRefreshToken = generateToken({ ...refreshDecoded }, "15m");
        //accessToken'ı ve refreshToken'ı yeniden oluşturup gönder
        res.json({
          accesToken: newAccessToken,
          refreshToken: newRefreshToken,
          refreshed: true,
        });
      } catch (error) { //refreshToken geçersiz ise
        res.status(401).json({ message: UNAUTHORİZED,toLogin:true });
        //401 döndür client tarafında 401 cevabını alınca giriş yaptır.
      }
    }
  }
};

module.exports = {
  login,
  register,
  check,
};
