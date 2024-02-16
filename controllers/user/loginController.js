var connectToOracle = require('../../config/config')

// To get Login escoshare users
// --------------------------------
const loginController = (req, res) => {
    const { user_id, user_password } = req.body
    try {
        if (user_id && user_password) {
            connectToOracle().then((connection) => {
                connection.execute(`SELECT * FROM user_tab WHERE USER_ID = ${user_id} AND USER_PASSWORD = ${user_password}`, (err, result) => {
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
                                err: true,
                                data: [],
                                message: 'no profile found/check if user_id or password is correct'
                            }
                            res.status(200).send(JSON.stringify(response))
                        }
                    } else {
                        response = {
                            err: true,
                            data: [],
                            message: 'Bad request'
                        }
                        res.status(400).send(JSON.stringify(response))
                    }
                });
            });

        } else {
            response = {
                err: true,
                data: [],
                message: 'Username and password are required.'
            }
            res.status(400).send(JSON.stringify(response))
        }

    } catch (err) {
        console.log('Err', + err)
        response = {
            err: true,
            data: [],
            message: 'Internal server error'
        }
        res.status(500).send(JSON.stringify(response))
    }
}

module.exports = { loginController };