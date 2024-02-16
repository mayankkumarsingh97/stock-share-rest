const express = require('express');
const app = express();
const multer = require('multer')
const upload = multer();


app.use(upload.none());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

//
//
const { userController, userControllerID } = require('./controllers/user/userController')
const { loginController } = require('./controllers/user/loginController')



//
app.use(bodyParser.json());
//
//
//---------------Login API----------------
app.post('/api/v1/escoshare/login/', loginController)
//
//
//--------- Routes i.e endpoints escoshare--------
app.get('/api/v1/escoshare/users/', userController)
app.get('/api/v1/escoshare/user/:id', userControllerID)




//..Start the server ..//
//
//
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})