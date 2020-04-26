const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adChatCtrl = require('../controllers/adChat');


router.get('/startOrGetChat/:idAd', auth, adChatCtrl.startOrGetChat);
router.post('/sendMessage', auth, adChatCtrl.sendMessage);
router.get('/userAdChats', auth, adChatCtrl.getUserAdChats);

module.exports = router;