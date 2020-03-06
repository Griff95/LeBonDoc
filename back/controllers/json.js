const structureTypes = require('../json/structureType');
const medicalFields = require('../json/medicalField');
const cities = require('../json/cities');
const regions = require('../json/regions');
const departments = require('../json/departments');
const adTypes = require('../json/adTypes');

exports.listStructureType = (req, res, next) => {
    res.status(200).json(structureTypes);
};

exports.listMedicalField = (req, res, next) => {
    res.status(200).json(medicalFields);
};

exports.listCities = (req, res, next) => {
    res.status(200).json(cities);
};

exports.listAdTypes = (req, res, next) => {
    res.status(200).json(adTypes);
};

exports.findLocationByPostalCode = (req, res, next) => {
    console.log("findLocationByPostalCode");
    const postalCode = req.params.postalCode;
    const _city = cities.filter((city) => {
        return city.zip_code === postalCode;
    })[0];
    if (_city) {
        console.log("found city\n"+ JSON.stringify(_city));
        const _department = departments.filter((department) => {
            return _city.department_code === department.code;
        })[0];
        if (_department) {
            console.log("found department\n"+ JSON.stringify(_department));
            const _region = regions.filter((region) => {
                return _department.region_code === region.code;
            })[0];
            if (_region) {
                console.log("found region\n"+ JSON.stringify(_region));
                const location = {
                    city: _city.name,
                    postalCode: _city.zip_code,
                    department: _department.name,
                    region: _region.name
                };
                res.status(200).json(location);
            } else { res.status(400).json(); }
        } else { res.status(400).json(); }
    } else { res.status(400).json(); }


};