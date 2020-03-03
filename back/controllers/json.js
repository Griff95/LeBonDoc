const structureTypes = require('../json/structureType');
const medicalFields = require('../json/medicalField');
const cities = require('../json/cities');

exports.listStructureType = (req, res, next) => {
    res.status(200).json(structureTypes);
};

exports.listMedicalField = (req, res, next) => {
    res.status(200).json(medicalFields);
};

exports.listCities = (req, res, next) => {
    res.status(200).json(cities);
};