const express = require('express')
const router = express.Router()
const { verifyJsonWebToken } = require('../utils/verifyJsonWebToken')

const { userController, userControllerID } = require('../controllers/user/userController')
const { loginController } = require('../controllers/user/loginController')
const { folioController } = require('../controllers/foliomaster/folioController')
const { nameAddressQuery } = require('../controllers/foliomaster/nameAddHoldController')
const { securityTypeCtrl } = require('../controllers/foliomaster/securityTypeCtrl')
const { certMastCtrl} = require('../controllers/certificateMast/certMastCtrl')
//
//---------------Login API----------------
router.post('/escoshare/login/', loginController)
//
//
//--------- Routes i.e endpoints escoshare--------
router.get('/escoshare/users/', userController)
router.get('/escoshare/user/:id', userControllerID)
//
//
router.post('/folio/holding/', folioController)
router.post('/name/address/holding/', nameAddressQuery)
//
router.post('/security/type/', securityTypeCtrl)
router.post('/certificate-master', certMastCtrl)

//
//
module.exports = router
//
//