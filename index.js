const express = require('express');
const app = express();
const multer = require('multer')
const upload = multer();
const Routes = require('./routes/user.route')

app.use(upload.none());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

//
//
//
app.use(bodyParser.json());
//
//
app.use('/api/v1', Routes)
//
//..Start the server ..//
//
//
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
})