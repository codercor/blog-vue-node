const router = require('express').Router();

const authController = require('../controllers/auth.controller');

// /auth/login
router.route("/login").post(authController.login)

// /auth/register
router.route("/register").post(authController.register)

// /auth/check
router.route("/check").get(authController.check)
//router.get('/check', authController.check); aynıdır.

module.exports = router;