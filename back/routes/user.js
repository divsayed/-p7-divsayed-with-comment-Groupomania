// const express = require("express");
// const router = express.Router();
const router = require('express').Router(); //racourci
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const isAdminOrHimself = require('../middleware/isAdminOrHimself')

// Importation des controllers
const controllerSignUp = require('../controllers/users/signup')
const controllerLogin = require('../controllers/users/login')
const controllerUpdateUser = require('../controllers/users/updateUser')
const controllerDeleteUser = require('../controllers/users/deleteUser')
const controllerGetOneUser = require('../controllers/users/getOneUser')


// Importation des models
const modelSignUp = require('../models/users/signup')
const modelLogin = require('../models/users/login')
const modelUpdateUser = require('../models/users/updateUser')
const modelDeleteUser = require('../models/users/deleteUser')
const modelGetOneUser = require('../models/users/getOneUser')


 //creation les rourtes 
router.get('/:id_user', auth, controllerGetOneUser, modelGetOneUser)
router.post('/signup', controllerSignUp, modelSignUp);
router.post('/login', controllerLogin, modelLogin); 
router.put('/:id_user',  auth, multer, isAdminOrHimself, controllerUpdateUser, modelUpdateUser);
router.delete('/:id_user', auth, isAdminOrHimself, controllerDeleteUser, modelDeleteUser);


module.exports = router; 