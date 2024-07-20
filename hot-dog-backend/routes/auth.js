const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const { protect, verifyToken } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/verify', protect, verifyToken);

module.exports = router;