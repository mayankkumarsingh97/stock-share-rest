const express = require('express')
const router = express.Router()
const { verifyJsonWebToken } = require('../utils/verifyJsonWebToken')

const { userController, userControllerID } = require('../controllers/user/userController')
const { loginController } = require('../controllers/user/loginController')



//
//---------------Login API----------------
router.post('/escoshare/login/', loginController)
//
//
//--------- Routes i.e endpoints escoshare--------
router.get('/escoshare/users/', verifyJsonWebToken, userController)
router.get('/escoshare/user/:id', verifyJsonWebToken, userControllerID)


module.exports = router