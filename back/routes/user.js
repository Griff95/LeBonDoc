const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/account', auth, userCtrl.getAccount);
router.put('/account', auth, userCtrl.editAccount);
// router.put('/updatePassword', auth, userCtrl.updatePassword);


/*
 * User API : localhost:3000/api/user
 *
 * * * * * * * * * *
 * PUBLIC
 *
 * Inscription
 * POST localhost:3000/api/user/signup
 * req.body.keys : email, password, name, lastName
 * res(200) : MessageOK
 *
 * Connection
 * POST localhost:3000/api/user/login
 * params : email, password
 * res(200) : LoggedUser
 *
 * * * * * * * * * *
 * AUTH REQUIRED --> userId
 *
 * Obtenir les informations de l'utilisateur
 * GET localhost:3000/api/user/account
 * req.body.keys : userId
 * res(200) : LoggedUser
 *
 * Editer les informations de l'utilisateur
 * PUT localhost:3000/api/user/account
 * req.body.keys : userId EditedUser
 * res(200) : EditedUser
 *
 * Changer le mot de passe
 * PUT localhost:3000/api/user/updatePassword
 * req.body.keys : password, confirmPassword, newPassword
 * res(200) : MessageOK
 *
 */

module.exports = router;