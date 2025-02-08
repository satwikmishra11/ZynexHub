const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ error: req.t('error_login') });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: req.t('welcome'), token });
    } catch (error) {
        res.status(500).json({ error: req.t('error_generic') });
    }
});

module.exports = router;
