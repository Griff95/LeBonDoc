const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adChatCtrl = require('../controllers/adChat');


router.post('/:idAd', auth, adChatCtrl.startOrGetChat);
router.get('/:idChat', auth, adChatCtrl.sendMessage);
// POST	api/chat/:idAd						--> Démarrer un chat avec un annonceur
// PUT 	api/chat/:idChat					--> Envoyer un message dans un chat (verif que idChat inclut dans user.chats)

module.exports = router;