const connectToOracle = require('../../config/db')
//
//
const certMastCtrl = (req, res) => {
    let security_type_desc = ''
    //
    const { folio_no, security_code } = req.body

    try {
        connectToOracle().then((connection) => {
            //
            const query = `SELECT no_of_sec,folio_no,certificate_number,distinctive_no_to,distinctive_no_from,transfer_number,transfer_date
            FROM certificate_master WHERE rownum < = 300 AND folio_no=:folio_no and security_code=:security_code`

            connection.execute(query, [folio_no, security_code], (err, results) => {

                if (err) {
                    console.log("Err + ", err)
                    response = {
                        err: true,
                        message: 'fail fetch!',
                    }
                    return res.status(500).send(JSON.stringify(response))
                }
                //
                if (folio_no && security_code) {
                    if (!err && results.rows.length > 0) {
                        var result_data = results.rows.map(function (row) {
                            return {
                                no_of_sec: row[0],
                                folio_no: row[1],
                                certificate_number: row[2],
                                distinctive_no_to: row[3],
                                distinctive_no_from: row[4],
                                transfer_number: row[5],
                                transfer_date: row[6],
                                seller_folio: row[1],
                            };
                        });

                    } else {
                        response = {
                            err: true,
                            message: 'no data found',
                        }
                        res.status(200).send(JSON.stringify(response))
                    }
                } else {
                    response = {
                        err: true,
                        message: 'folio_number or security_code missing',
                    }
                    res.status(200).send(JSON.stringify(response))
                }

                const query1 = `SELECT security_type_desc FROM security_type_masters WHERE security_type_code=:security_code`

                connection.execute(query1, [security_code], (err, results, next) => {
                    if (!err) {
                        security_type_desc = results.rows.map(row => {
                            return {
                                security_type_desc: row[0]
                            }
                        })

                        const query2 = `SELECT *  FROM folio_master  WHERE folio_number =:folio_no`
                        //
                        connection.execute(query2, [folio_no], (err, results, next) => {
                            if (!err) {
                                const result = {};
                                results.metaData.forEach((meta, index) => {
                                    result[meta.name] = results.rows[0][index];
                                });
                                //
                                response = {
                                    err: false,
                                    security_type_desc,
                                    folio_det: result,
                                    data: result_data, message: 'success!',
                                }
                                res.status(200).send(JSON.stringify(response))

                            } else {
                                response = {
                                    err: true,
                                    message: 'Internal server error',
                                }
                                res.status(500).send(JSON.stringify(response))
                            }
                        })

                    } else {
                        response = {
                            err: true,
                            message: 'Internal server error',
                        }
                        res.status(500).send(JSON.stringify(response))
                    }
                })

            });

        });

    } catch (err) {
        console.log('Err', + err)
    }
}

module.exports = { certMastCtrl }



