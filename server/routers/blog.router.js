const router = require('express').Router();

const blogController = require('../controllers/blog.controller');

// /blog
router.route('/').get(blogController.getMany).post(blogController.add);
// /blog/:id  //örnek /blog/15
router.route('/:id').get(blogController.getById).put(blogController.update).delete(blogController.remove);

module.exports = router;