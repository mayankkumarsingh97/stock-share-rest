const express = require('express')
const router = express.Router()
//
//
const { verifyJsonWebToken } = require('../utils/verifyJsonWebToken')
//
const { userController, userControllerID } = require('../controllers/user/userController')
const { loginController } = require('../controllers/user/loginController')
//
const { folioController } = require('../controllers/foliomaster/folioController')
const { nameAddressQuery } = require('../controllers/foliomaster/nameAddHoldController')
const { securityTypeCtrl } = require('../controllers/foliomaster/securityTypeCtrl')
//
const { certMastCtrl } = require('../controllers/certificateMast/certMastCtrl')
const { ETL_mast_ctrl } = require('../controllers/ETL_Ctrl/etl_mast_ctrl')
//
//
const { dividendMastCtrl } = require('../controllers/dividendMast/dividendMastCtrl')
const { _get_Dividend_Det_By_Date_Ctrl } = require('../controllers/helperCtrls/div_by_date')
//
const { InterstMastCtrl } = require('../controllers/interstMast/interstMastCtrl')
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
//
router.post('/etl-certificate-master', ETL_mast_ctrl)
router.post('/certificate-master', certMastCtrl)

//
router.post('/dividend-master-query-all', dividendMastCtrl)
router.post('/dividend-master-get-det-by-date', _get_Dividend_Det_By_Date_Ctrl)
//
//
//
router.post('/interest-master-query', InterstMastCtrl)
//
//
module.exports = router
//
//