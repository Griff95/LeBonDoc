const User = require('../models/user');
const Ad = require('../models/ad');
const AdChat = require('../models/adChat');

exports.startOrGetChat = (req, res, next) => {
    console.log("startOrGetChat");
    User.findById(req.body.userId).populate("chats").then((user) => {
        for (chat in user.chats) {
            if (chat.ad.equals(req.param.idAd)) {
                res.status(201).json(chat);
            }
        }
        Ad.findById(req.param.idAd).then( (ad) => {
            const adChat = new AdChat({
                user: req.body.userId,
                advertiser: ad.advertiser,
                ad: ad._id
            });
            adChat.save()
                .then(() => res.status(201).json({ message: 'success' }))
                .catch((error) => {res.status(400).json({error: error});})
        }).catch((error) => {res.status(400).json({error: error});});
    }).catch((error) => {res.status(400).json({error: error});});
};

exports.sendMessage = (req, res, next) => {
    console.log("sendMessage");
    const chatMsg = {
        user: req.body.userId,
        msg: req.body.msg,
        createdAt: Date()
    };
    AdChat.findByIdAndUpdate(req.param.idChat, { $push: { msg: chatMsg }}).then((adChat) => {
        res.status(200).json(adChat);
    }).catch( (err) => { res.status(400).json({ error: "send message failed" })});
};