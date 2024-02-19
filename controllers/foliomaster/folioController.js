var connectToOracle = require('../../config/db')

// --------------------------------------
//To get folioController escoshare users
// -------------------------------------

const folioController = (req, res) => {
    const { folio_no, meeting_date } = req.body
    console.log(folio_no, 'folio_no')
    console.log(meeting_date, 'meeting_date')

    if (!folio_no || !meeting_date) {
        return res.send(JSON.stringify('Err: folio_no missing'))
    }

    try {
        connectToOracle().then((connection) => {
            let query = `SELECT * FROM folio_master where folio_number=:folio_no`;
            //
            connection.execute(`${query}`, [folio_no], (err, results) => {
                //
                if (!err) {
                    if (results) {
                        const result = {};
                        results.metaData.forEach((meta, index) => {
                            result[meta.name] = results.rows[0][index];
                        });

                        response = {
                            err: false,
                            data: {
                                dp_id: "",
                                client_id: "",
                                folio_det: result,
                                holding_det: {}
                            },
                            message: 'success!'
                        }

                        res.send(JSON.parse(JSON.stringify(response)))

                    } else {
                        response = {
                            err: false,
                            message: 'check folio no/ no data found!'
                        }
                        res.send(JSON.stringify(response))
                    }

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


module.exports = { folioController }

