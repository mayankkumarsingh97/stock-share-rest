const connectToOracle = require('../../config/db')
//
//
const certMastCtrl = (req, res) => {
    let security_type_desc = ''
    //
    const { folio_no, security_code } = req.body
    const { certificate_no, tag } = req.body
    const { dist_from, dist_to } = req.body
    const { transfer_number, transfer_date } = req.body
    const { seller_folio } = req.body
    //
    try {
        connectToOracle().then((connection) => {
            //
            let query = `
            SELECT no_of_sec,folio_no,certificate_number,distinctive_no_to,distinctive_no_from,transfer_number,transfer_date,CURR_STATUS,PREV_FOLIO_NUMBER
            FROM certificate_master WHERE rownum < = 100 AND folio_no=:folio_no AND security_code=:security_code
            `
            //
            const _qu_certificate_number_FIL = `AND certificate_number=${certificate_no}`
            if (certificate_no) query += _qu_certificate_number_FIL
            //
            const _qu_tag_FIL = `AND CURR_STATUS='${tag}'`
            if (tag) query += _qu_tag_FIL
            //
            const _qu_transfer_number_FIL = `AND transfer_number=${transfer_number}`
            if (transfer_number) query += _qu_transfer_number_FIL
            //
            //
            if (dist_from && dist_to) query += `AND distinctive_no_to >=${dist_to} and distinctive_no_from <= ${dist_from}`;
            //
            //
            //-----------------------------------------------------------------------//
            //-----------------------------------------------------------------------//
            //
            connection.execute(query, [folio_no, security_code], (err, results) => {

                if (err) {
                    console.log("Err : + ", err)
                    return res.status(500).send(JSON.stringify(response = {
                        err: true,
                        message: 'fail fetch!',
                    }))
                }
                //
                if (security_code && folio_no) {
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
                                holding: row[0],
                                seller_folio: row[1],
                                tag: row[7],
                                seller_folio: row[8],
                            };
                        });

                    } else {
                        response = {
                            err: true,
                            message: 'No data found / Please check if folio number or detail provided are correct !',
                        }
                        res.status(200).send(JSON.stringify(response))
                    }
                } else {
                    response = {
                        err: true,
                        message: 'folio number or security_code missing',
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

                        const query2 = `SELECT NAME_FIRST,NAME_LAST,NAME_MIDDLE,ADD1,ADD2,ADD3,PIN_ID,UNDLV_NO,UNDLV_DATE  FROM folio_master  WHERE folio_number =:folio_no`
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
                                    data: result_data,
                                    message: 'success!'
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
        response = {
            err: true,
            message: 'Internal server error / Please try again later',
        }
        res.status(500).send(JSON.stringify(response))
    }
}

module.exports = { certMastCtrl }



