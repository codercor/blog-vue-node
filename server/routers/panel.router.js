const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');
const blogController = require('../controllers/blog.controller');


router.use(authMiddleware); //gelen tüm isteklere authMiddleware'i uygula

// /panel/myBlogs
router.route('/myBlogs').get(blogController.getByUserId);
router.route('/createBlog').post(blogController.createByUserId);
router.route('/blog/:id').put(blogController.update).delete(blogController.remove);




router.route('/uploadImage').post(uploadMiddleware.single('image'),(req,res)=>{
    res.json({file:req.file.filename});
});

module.exports = router;