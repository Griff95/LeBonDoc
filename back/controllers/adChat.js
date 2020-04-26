const User = require('../models/user');
const Ad = require('../models/ad');
const AdChat = require('../models/adChat');

exports.startOrGetChat = (req, res, next) => {
    console.log("startOrGetChat");
    User.findById(req.body.userId).populate("chats").then((user) => {
        for (chat in user.chats) {
            if (chat.ad.equals(req.params.idAd)) {
                res.status(201).json(chat);
            }
        }
        Ad.findById(req.params.idAd).then( (ad) => {
            const adChat = new AdChat({
                user: req.body.userId,
                advertiser: ad.advertiser,
                ad: ad._id
            });
            adChat.save()
                .then(() => res.status(201).json(adChat))
                .catch((error) => {res.status(400).json(error)})
        }).catch((error) => {res.status(400).json(error)});
    }).catch((error) => {res.status(400).json(error)});
};

exports.sendMessage = (req, res, next) => {
    console.log("sendMessage");
    User.findById(req.body.userId).then((user) => {
        if (user.chats.includes(req.body.idChat)) {
            const chatMsg = {
                user: req.body.userId,
                msg: req.body.msg,
                createdAt: Date()
            };
            AdChat.findByIdAndUpdate(req.body.idChat, { $push: { msg: chatMsg }}).then((adChat) => {
                res.status(200).json(adChat);
            }).catch( (error) => { res.status(400).json(error)});
        }
    });

};

exports.getUserAdChats = (req, res, next) => {
    console.log("getUserAdChats");
    User.findById(req.body.userId).populate("chats").then( (user) => {
        res.status(201).json(user.chats);
    }).catch((error) => {res.status(400).json(error)});
};