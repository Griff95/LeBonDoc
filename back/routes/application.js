const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const applicationCtrl = require('../controllers/application');

// router.get('', auth, applicationCtrl.getUserApplication);
// router.delete('/:id', auth, applicationCtrl.removeApplication);
// router.put('/:id', auth, applicationCtrl.editApplication);
// router.post('/apply/:idAd', auth, applicationCtrl.postApplication);


module.exports = router;