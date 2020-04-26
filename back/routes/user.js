const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:userId', auth, userCtrl.getAccount);
router.put('/', auth, userCtrl.editAccount);
router.get('/ad/:userId', auth, userCtrl.getUserAds);
// router.put('/updatePassword', auth, userCtrl.updatePassword);


module.exports = router;