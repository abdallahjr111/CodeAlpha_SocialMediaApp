const express = require('express');
const router = express.Router();
const { getProfile, followUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:username', getProfile);
router.post('/:username/follow', auth, followUser);

module.exports = router;
