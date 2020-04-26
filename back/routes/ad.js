const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adCtrl = require('../controllers/ad');


router.post('/search', adCtrl.search);
router.get('/recent', adCtrl.findRecent);
router.get('/medicalField/:id', adCtrl.findAdsByMedicalFieldId);
router.get('/department/:id', adCtrl.findAdsByDepartmentId);
router.put('/addFavorites', auth, adCtrl.addToFavorites);
router.put('/removeFavorites', auth, adCtrl.removeFavorites);
router.get('/favorites', auth, adCtrl.getFavorites);
router.get('/:id', adCtrl.getAd);
router.delete('/:id', auth, adCtrl.removeAd);
router.put('/:id', auth, adCtrl.editAdDescription);
router.post('/', auth, adCtrl.postAd);

/*
 * Ad API : localhost:3000/api/ad
 *
 * * * * * * * * * *
 * PUBLIC
 *
 * Obtenir les informations d'une annonce par son id
 * GET localhost:3000/api/ad/:id
 * req.body.keys :
 * res(200) : Ad
 *
 * Obtenir les 10 annonces les plus récentes
 * GET localhost:3000/api/ad/recent
 * req.body.keys :
 * res(200) : [ Ad ]
 *
 * Recherche des annonces par zone géographique, domaine médical, type d'annonce..
 * GET localhost:3000/api/ad/search
 * req.body.keys : [ department ], [ medicalField ], [  adType ], [ structureType ]
 * res(200) : [ Ad ]
 *
 * * * * * * * * * *
 * AUTH REQUIRED --> userId
 *
 * Obtenir les 10 annonces les plus récentes et du même domaine médical
 * GET localhost:3000/api/ad/sameMedicalField
 * req.body.keys : userId
 * res(200) : [ Ad ]
 *
 * Obtenir les 10 annonces les plus récentes et du même département
 * GET localhost:3000/api/ad/sameDepartment
 * req.body.keys : userId
 * res(200) : [ Ad ]
 *
 * Désactivé une annonce de l'utilisateur par son id
 * DELETE localhost:3000/api/ad/:id
 * req.body.keys : userId
 * res(200) : MessageOK
 *
 * Poster une nouvelle annonce
 * POST localhost:3000/api/ad/
 * req.body.keys : userId Ad
 * res(200) : MessageOK
 *
 * Editer une annonce de l'utilisateur par son id
 * PUT localhost:3000/api/ad/:id
 * req.body.keys : userId Ad
 * res(200) : Ad
 *
 * Ajouter une annonce aux favoris
 * POST localhost:3000/api/ad/addFavorites/:id
 * req.body.keys : userId
 * res(200) : MessageOK
 *
 * Enlever une annonce des favoris
 * POST localhost:3000/api/ad/removeFavorites/:id
 * req.body.keys : userId
 * res(200) : MessageOK
 *
 */

module.exports = router;