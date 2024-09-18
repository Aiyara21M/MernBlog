const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt'); // เปลี่ยนชื่อเป็น expressJwt เพื่อหลีกเลี่ยงความสับสน
require('dotenv').config();

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;
    if (process.env.PASSWORDTOKEN === password) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return res.json({ token, user });
    } else {
      res.status(400).json({ error: 'ไม่ถูกต้อง' });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Middleware สำหรับการตรวจสอบ JWT
exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth'
});
