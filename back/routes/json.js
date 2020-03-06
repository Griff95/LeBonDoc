const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
const jsonCtrl = require('../controllers/json');

router.get('/structureTypes', jsonCtrl.listStructureType);
router.get('/medicalFields', jsonCtrl.listMedicalField);
router.get('/adTypes', jsonCtrl.listAdTypes);
router.get('/findByPostalCode/:postalCode', jsonCtrl.findLocationByPostalCode);

module.exports = router;