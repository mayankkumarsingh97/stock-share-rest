const express = require('express')
const router = express.Router()
const { verifyJsonWebToken } = require('../utils/verifyJsonWebToken')

const { userController, userControllerID } = require('../controllers/user/userController')
const { loginController } = require('../controllers/user/loginController')
const { folioController } = require('../controllers/foliomaster/folioController')
const { nameAddressQuery } = require('../controllers/foliomaster/nameAddHoldController')

//
//---------------Login API----------------
router.post('/escoshare/login/', loginController)
//
//
//--------- Routes i.e endpoints escoshare--------
router.get('/escoshare/users/', verifyJsonWebToken, userController)
router.get('/escoshare/user/:id', verifyJsonWebToken, userControllerID)
//
//
router.post('/folio/holding/', verifyJsonWebToken, folioController)
router.post('/name/address/holding/', verifyJsonWebToken, nameAddressQuery)
router.post('/security/type', verifyJsonWebToken, () => { })

//
//
module.exports = router
//
//