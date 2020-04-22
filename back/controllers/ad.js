const Ad = require('../models/ad');
const User = require('../models/user');


exports.editAdDescription = (req, res, next) => {
    console.log("editAd");
    User.findById(req.body.userId).then( (user) => {
            console.log(user);
            if (user.ads && user.ads.includes(req.params.id)) {
            Ad.findByIdAndUpdate(req.params.id, { description :req.body.description }, {new:true}).then( (ad) => {
                console.log(ad);
                res.status(201).json(ad);
            }).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                });
        }
    }).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAd = (req, res, next) => {
    console.log("getAd by id");
    Ad.findById(req.params.id).populate("advertiser").exec().then(
        (ad) => {
            res.status(200).json(ad);
        }
    ).catch(
        (error) => {
            return res.status(404).json({ error: error });
        }
    );
};

exports.postAd = (req, res, next) => {
    console.log("postAd");
    const ad = new Ad(req.body);
    console.log(JSON.stringify(ad));
    if (ad && req.body.userId) {
        ad.advertiser = req.body.userId;
        ad.save().then(
            (ad) => {
                console.log(ad);
                User.findByIdAndUpdate(req.body.userId, {
                    $push: { ads: ad._id }
                }).then( (user) => {
                    console.log(user);
                    res.status(201).json({
                        message: 'Ad saved successfully!'
                    })
                });
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    } else {
        console.log("oups");
    }
};

exports.removeAd = (req, res, next) => {
    console.log("deactivateAd");
    User.findById(req.body.userId).then((user) => {
        console.log(user);
        if (user.ads && user.ads.includes(req.params.id)) {
            Ad.findByIdAndDelete(req.params.id).exec().then(
                (ad) => {
                    // console.log(ad);
                    User.findByIdAndUpdate(req.body.userId, {
                        $pull: {ads: ad._id}
                    }).then((user) => {
                        // console.log(user);
                        res.status(201).json({
                            message: 'Ad removed successfully!'
                        })
                    }).catch((error) => { res.status(400).json({ error: error }); });
                    res.status(201).json({
                        message: 'Ad deactivated successfully!'
                    });
                }
            ).catch((error) => { res.status(400).json({ error: error }); });
        }
    }).catch((error) => { res.status(400).json({ error: error }); });;
};

exports.findRecent = (req, res, next) => {
    console.log("findRecent Ads");
    Ad.find().sort('-createdAt').limit(10).then( (ads) => {
            res.status(200).json(ads);
    }
    ).catch(
        (error) => {
            res.status(400).json([]);
        }
    );
};

exports.findAdsByDepartmentId =  (req, res, next) => {
    console.log("findAdsByDepartmentId");
    Ad.find({ "healthStructure.location.department": req.body.department }).sort('-createdAt').limit(10).then( (ads) => {
            res.status(200).json(ads);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.findAdsByMedicalFieldId =  (req, res, next) => {
    console.log("findAdsByMedicalFieldId");
    Ad.find({ medicalField : req.params.id }).sort('-createdAt').limit(10).then( (ads) => {
            res.status(200).json(ads);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.addToFavorites = (req, res, next) => {
    console.log("addToFavorites");
    User.findByIdAndUpdate(req.body.userId, { $push: { favorites: req.param.id }}).then( (user) => {
        res.status(200).json({ msg: "Add to favorite successful" });
    }).catch( (err) => { res.status(400).json({ error: "Add to favorite failed" })});
};

exports.removeFavorites = (req, res, next) => {
    console.log("removeFavorites");
    User.findByIdAndUpdate(req.body.userId, { $pull: { favorites: req.param.id }}).then( (user) => {
        res.status(200).json({ msg: "Remove from favorite successful" });
    }).catch( (err) => { res.status(400).json({ error: "Remove From favorite failed" })});
};

exports.search = (req, res, next) => {
    console.log("search");
    const query = {};
    if (req.body.medicalField) query.medicalField = req.body.medicalField;
    if (req.body.postalCode) query.healthStructure.postalCode = req.body.postalCode;
    if (req.body.structureType) query.healthStructure.structureType = req.body.structureType;
    if (req.body.adType) query.adType = req.body.adType;
    if (query !== {})
        Ad.find(query).then((ads) => {
            res.status(200).json(ads);
        }).catch( (err) => { res.status(400).json({ error: "Search failed" })});

};