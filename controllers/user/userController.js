var connectToOracle = require('../../config/config')

// -------------------------------
//To get All escoshare users
// -------------------------------
const userController = (req, res) => {
    try {
        connectToOracle().then((connection) => {
            connection.execute(`SELECT * FROM user_tab`, (err, result, fields) => {
                // if (err) throw err;
                // console.log(result.rows);
                if (!err) {
                    response = {
                        err: false,
                        data: result.rows,
                        message: 'success'
                    }
                    res.send(JSON.stringify(response))

                } else {
                    response = {
                        err: true,
                        data: [],
                        message: 'fail'
                    }
                    res.send(JSON.stringify(response))
                }
            });
        });

    } catch (err) {
        console.log('Err', + err)
    }
}



// To get Indivisual escoshare users
// --------------------------------
const userControllerID = (req, res) => {
    const id = req.params.id
    try {
        connectToOracle().then((connection) => {
            connection.execute(`SELECT * FROM user_tab where USER_ID = ${id}`, (err, result, fields) => {
                if (!err) {
                    if (result.rows.length > 0) {
                        response = {
                            err: false,
                            data: result.rows,
                            message: 'success'
                        }
                        res.status(200).send(JSON.parse(JSON.stringify(response)))

                    } else {
                        response = {
                            err: false,
                            data: [],
                            message: 'no data found..'
                        }
                        res.status(200).send(JSON.stringify(response))
                    }
                } else {
                    res.status(400).send('Bad request')
                }
            });
        });

    } catch (err) {
        console.log('Err', + err)
    }
}

module.exports = { userController, userControllerID };