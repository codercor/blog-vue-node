const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const blogController = require('../controllers/blog.controller');

// /blog
router.route('/').get(blogController.getMany).post(authMiddleware,blogController.add);
// /blog/:id  //örnek /blog/15
router.route('/:id').get(blogController.getById).put(authMiddleware,blogController.update).delete(authMiddleware,blogController.remove);


module.exports = router;