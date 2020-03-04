const Ad = require('../models/ad');
const User = require('../models/user');

exports.editAd = (req, res, next) => {
    console.log("editAd");
    User.findById(req.body.userId).then( (user) => {
            console.log(user);
            if (user.ads && user.ads.includes(req.params.id)) {
            Ad.findByIdAndUpdate(req.params.id, req.body, {new:true}).then( (ad) => {
                console.log(ad);
                res.status(201).json({ ad });
            });
        }
    }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAd = (req, res, next) => {
    console.log("getAd by id");
    Ad.findById(req.params.id).then(
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
};

exports.deactivateAd = (req, res, next) => {
    console.log("removeAd");
    User.findById(req.body.userId).then( (user) => {
        console.log(user);
        if (user.ads && user.ads.includes(req.params.id)) {
            Ad.findByIdAndUpdate(req.params.id, { isAvailable: false }).then(
                (ad) => {
                    console.log(ad);
                    /*User.findByIdAndUpdate(req.body.userId, {
                        $pull: {ads: ad._id}
                    }).then((user) => {
                        console.log(user);
                        res.status(201).json({
                            message: 'Ad removed successfully!'
                        })
                    }).catch((error) => { res.status(400).json({ error: error }); });*/
                    res.status(201).json({
                        message: 'Ad deactivated successfully!'
                    });
                }
            ).catch((error) => { res.status(400).json({ error: error }); });
        }
    });
};

exports.findRecent = (req, res, next) => {
    console.log("findRecent");
    Ad.find().sort('-createdAt').limit(10).then( (ads) => {
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

exports.findSameDepartment =  (req, res, next) => {
    console.log("findSameDepartement");
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

exports.findSameMedialField =  (req, res, next) => {
    console.log("findSameMedicalField");
    Ad.find({ medicalField : req.body.medicalField }).sort('-createdAt').limit(10).then( (ads) => {
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