const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');
const jsonCtrl = require('../controllers/json');

router.get('/structureType', jsonCtrl.listStructureType);
router.get('/medicalField', jsonCtrl.listMedicalField);

module.exports = router;