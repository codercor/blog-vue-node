const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const blogController = require('../controllers/blog.controller');

// /blog
//router.route('/').get(blogController.getMany).post(authMiddleware,blogController.add);
router.route('/').get(blogController.getMany)
// /blog/:id  //örnek /blog/15
router.route('/:id').get(blogController.getById);


module.exports = router;