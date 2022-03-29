const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const blogController = require('../controllers/blog.controller');

// /panel/myBlogs
router.route('/myBlogs').get(authMiddleware,blogController.getByUserId);

module.exports = router;