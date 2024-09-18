const slugify = require("slugify");
const Blog = require("../models/blogs");
const { v4: uuidv4 } = require('uuid');
// บันทึกข้อมูล
exports.create = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const slug = slugify(title);

    if (!title||!content) {
      return res.status(400).json({ error: 'ป้อนข้อมูลให้ครบถ้วน' });
    }
    // กำหนดค่า author เป็น "admin" หากไม่มีค่า
    const blogAuthor = author || 'Admin';
    const blogSlug = slug || uuidv4();

    const newBlog = new Blog({ title, content, author: blogAuthor , slug:blogSlug });
    const savedBlog = await newBlog.save(); 

    res.json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: `บทความชื่อซ้ำ` });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}); 
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};


exports.getBlog = async (req, res) => {
  try {

    const { slug } = req.params;

    const blog = await Blog.findOne({ slug: slug });

    if (!blog) {
      return res.status(404).json({ error: 'ไม่พบบทความที่ต้องการ' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};


exports.delBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await Blog.deleteOne({ slug: slug });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'ไม่พบบล็อกที่ต้องการลบ' });
    }
    res.status(200).json({ message: 'ลบบล็อกสำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบบล็อก' });
  }
};


exports.udBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const {title,content,author} = req.body;

    const blog = await Blog.findOneAndUpdate({ slug }, {title,content,author,slug}, { new: true })
    
    if (!blog) {
      return res.status(404).json({ error: 'ไม่พบบล็อกที่ต้องการอัปเดต' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตบล็อก' });
  }
};




