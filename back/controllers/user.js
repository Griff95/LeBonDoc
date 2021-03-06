const bcrypt = require('bcrypt');
const User = require('../models/user');
const Ad = require('../models/ad');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log("signup requested " + JSON.stringify(req.body));
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                lastName: req.body.lastName,
                phone: req.body.phone,
                city: req.body.city,
                department: req.body.department,
                postalCode: req.body.postalCode,
                region: req.body.region,
                medicalField: req.body.medicalField
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    console.log("login requested");
    User.findOne({ email: req.body.email }).select("+password")
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            console.log(user);
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getAccount = (req, res, next) => {
    console.log("getAccount");
    // console.log(req.body);
    User.findById(req.body.userId).then(
        (user) => {
            // console.log(user);
            res.status(200).json(user);
        }
    ).catch(
        (error) => {
            return res.status(404).json({ error: error });
        }
    );

};

exports.editAccount = (req, res, next) => {
    console.log("editAccount for user " + req.body);
    User.findByIdAndUpdate(req.body.userId, req.body, { new: true })
        .then((user) => {
            console.log(user);
            res.status(201).json({ user });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
    });
};

exports.getUserAds = (req, res, next) => {
    console.log("getUserAds");
    User.findById(req.params.userId).then( (user) => {
        console.log(user);
        if (user.ads.length > 0) {
            Ad.find({ '_id' :  { $in: user.ads }}, 'title adType advertiser healthStructure.city createdAt').then( (ads) => {
                res.status(201).json(ads);
            }).catch(
                (error) => {
                    res.status(400).json({
                        error: "Oups.."
                    });
                });
        } else {
            res.status(200).json([]);
        }
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};