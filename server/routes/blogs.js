const express = require("express")
const router = express.Router()
const {create,getBlogs,getBlog,delBlog,udBlog} = require('../controllers/blogController')
const {requireLogin} = require("../controllers/authController")

router.post('/create',requireLogin,create)

//การเรียกใช้งาน
router.get('/blogs', getBlogs);
router.get('/blog/:slug',getBlog);


router.delete('/delete/:slug',requireLogin,delBlog);
router.put('/update/:slug',requireLogin,udBlog);


module.exports=router