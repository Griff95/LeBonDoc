const User = require('../models/user');
const Ad = require('../models/ad');
const AdChat = require('../models/adChat');

exports.startOrGetChat = (req, res, next) => {
    console.log("startOrGetChat");
    User.findById(req.body.userId).populate({ path: 'chats', populate: { path: 'user advertiser', model: 'User', select: 'name lastName'}}).populate({ path: 'chats', populate: { path: 'ad', model: 'Ad', select:'title'}}).then((user) => {
        // console.log('found user ' + user);
        // console.log('idAd is ' + req.params.idAd);
        // console.log('user.chats is ' + user.chats);
        // console.log('typeof user.chats = ' + typeof user.chats);
        for (let i = 0; i < user.chats.length ; i++) {
            // console.log('for chat is ' + user.chats[i]);
            if (user.chats[i].ad.equals(req.params.idAd)) {
                console.log("founded " + user.chats[i]);
                res.status(201).json(user.chats[i]);
                return;
            }
        }
        Ad.findById(req.params.idAd).then( (ad) => {
            const adChat = new AdChat({
                user: req.body.userId,
                advertiser: ad.advertiser,
                ad: ad._id
            });
            console.log("New AdChat is " + adChat);
            adChat.save()
                .then(() => {
                    User.findByIdAndUpdate(req.body.userId, { $push: { chats: adChat } }).catch((error) => {res.status(400).json(error)});
                    User.findByIdAndUpdate(ad.advertiser, { $push: { chats: adChat } }).catch((error) => {res.status(400).json(error)});
                    AdChat.findById(adChat._id).populate({ path: 'user advertiser', model: 'User', select: 'name lastName'}).populate({ path: 'chats', populate: { path: 'ad', model: 'Ad', select:'title'}}).then( (newChat) => {
                        res.status(201).json(newChat);
                    }).catch((error) => {res.status(400).json(error)});
                }).catch((error) => {res.status(400).json(error)})
        }).catch((error) => {res.status(400).json(error)});
    }).catch((error) => {res.status(400).json(error)});
};

exports.sendMessage = (req, res, next) => {
    console.log("sendMessage");
    User.findById(req.body.userId).then((user) => {
        console.log('found user ' + user);
        console.log('idChat is ' + req.body.idChat);
        if (user.chats.includes(req.body.idChat)) {
            const chatMsg = {
                user: req.body.userId,
                msg: req.body.msg,
                createdAt: Date()
            };
            AdChat.findByIdAndUpdate(req.body.idChat, { $push: { msg: chatMsg }}, {new: true}). populate({ path:'ad', model:'Ad', select:'title'}).then((adChat) => {
                res.status(200).json(adChat);
            }).catch( (error) => { res.status(400).json(error)});
        }
    });

};

exports.getUserAdChats = (req, res, next) => {
    console.log("getUserAdChats");
    User.findById(req.body.userId).populate({ path: 'chats', populate: { path: 'user advertiser', model: 'User', select: 'name lastName'}}).populate({ path: 'chats', populate: { path: 'ad', model: 'Ad', select:'title'}}).then( (user) => {
        res.status(201).json(user.chats);
    }).catch((error) => {res.status(400).json(error)});
};