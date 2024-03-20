//
//
var connectToOracle = require('../../config/db')
//
// --------------------------------------
//To get Dividend Master Data
// --------------------------------------
//
const dividendMastCtrl = (req, res) => {
    //
    const { folio_no } = req.body
    //
    //
    if (!folio_no) {
        return res.send(JSON.stringify('Err: folio_no missing or meeting_date'))
    }

    try {
        connectToOracle().then((connection) => {
            let query = `
            select  dir_p.description,  dm.date_of_payment,
            dm.security_code,dm.shares,dm.net_dividend_amount,
            dm.micr_no,dm.status_code,dm.folio_no,dm.voice_mail_status  
            from dividend_masters dm 
            Left Join dir_periods  dir_p on dm.date_of_payment = dir_p.date_of_payment 
            where  dir_p.security_code =1 and folio_no=:folio_no
            `;
            //
            let q_nsdl_dcf_mast = `SELECT dp_id, client_id FROM nsdl_dcf_mast WHERE folio_no=:folio_no`
            //
            let q_cdsl_dcf_mast = `SELECT dp_id, client_id FROM cdsl_dcf_mast WHERE folio_no=:folio_no`
            //
            let get_folio_details = `SELECT * FROM folio_master where folio_number=:folio_no`;
            //
            if (folio_no > 700000 && folio_no < 9999999) {
                connection.execute(q_nsdl_dcf_mast, [folio_no], (err, results) => {
                    //
                    const result = {};
                    results.metaData.forEach((meta, index) => {
                        result[meta.name] = results.rows[0][index];
                    });
                    const Ids = result
                    //
                    //
                    if (!err) {
                        connection.execute(`${query}`, [folio_no], (err, results) => {
                            //
                            if (!err) {
                                if (results.rows.length > 0) {
                                    const result = results.rows.map(function (row) {
                                        return {
                                            description: row[0],
                                            date_of_payment: row[1],
                                            // security_code: row[2],
                                            shares: row[3],
                                            net_dividend_amount: row[4],
                                            micr_no: row[5],
                                            status_code: row[6],
                                            folio_no: row[7],
                                            voice_mail_status: row[8],
                                        };

                                    });
                                    //
                                    let folio_det = {};
                                    //
                                    connection.execute(get_folio_details, [folio_no], (err, results) => {

                                        results.metaData.forEach((meta, index) => {
                                            folio_det[meta.name] = results.rows[0][index];
                                        });
                                        //
                                        response = {
                                            err: false,
                                            data: result,
                                            clientIds: Ids,
                                            folio_det,
                                            message: 'success!'
                                        }
                                        //
                                        res.send(JSON.parse(JSON.stringify(response)))
                                    })


                                } else {
                                    response = {
                                        err: true,
                                        message: 'check folio no/ no data found !'
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
                    } else {
                        console.log('Err:', +err)
                        response = {
                            err: true,
                            data: [],
                            message: 'fail'
                        }
                        res.send(JSON.stringify(response))
                    }

                });
            } else if (folio_no > 401000 && folio_no < 700000) {

                connection.execute(q_cdsl_dcf_mast, [folio_no], (err, results) => {

                    const result = {};
                    results.metaData.forEach((meta, index) => {
                        result[meta.name] = results.rows[0][index];
                    });
                    const Ids = result
                    //
                    if (!err) {
                        connection.execute(`${query}`, [folio_no], (err, results) => {
                            //
                            if (!err) {
                                if (results.rows.length > 0) {
                                    const result = results.rows.map(function (row) {
                                        return {
                                            description: row[0],
                                            date_of_payment: row[1],
                                            security_code: row[2],
                                            shares: row[3],
                                            net_dividend_amount: row[4],
                                            micr_no: row[5],
                                            status_code: row[6],
                                            folio_no: row[7],
                                            voice_mail_status: row[8],
                                        };

                                    });

                                    let folio_det = {};
                                    //
                                    connection.execute(get_folio_details, [folio_no], (err, results) => {

                                        results.metaData.forEach((meta, index) => {
                                            folio_det[meta.name] = results.rows[0][index];
                                        });

                                        response = {
                                            err: false,
                                            data: result,
                                            clientIds: Ids,
                                            folio_det,
                                            message: 'success!'
                                        }
                                        //
                                        res.send(JSON.parse(JSON.stringify(response)))
                                    })
                                } else {
                                    response = {
                                        err: true,
                                        message: 'check folio no/ no data found !'
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
                    } else {
                        console.log('Err:', +err)
                        response = {
                            err: true,
                            data: [],
                            message: 'fail'
                        }
                        res.send(JSON.stringify(response))
                    }

                });
            } else {
                //
                if (folio_no) {
                    //
                    const Ids = {
                        "“dp_id": "",
                        "client_Id": "",
                    }
                    //
                    connection.execute(`${query}`, [folio_no], (err, results) => {
                        //
                        if (!err) {
                            if (results.rows.length > 0) {
                                const result = results.rows.map(function (row) {
                                    return {
                                        description: row[0],
                                        date_of_payment: row[1],
                                        security_code: row[2],
                                        shares: row[3],
                                        net_dividend_amount: row[4],
                                        micr_no: row[5],
                                        status_code: row[6],
                                        folio_no: row[7],
                                        voice_mail_status: row[8],
                                    };

                                });

                                let folio_det = {};
                                //
                                connection.execute(get_folio_details, [folio_no], (err, results) => {

                                    results.metaData.forEach((meta, index) => {
                                        folio_det[meta.name] = results.rows[0][index];
                                    });

                                    const Ids = {
                                        "DP_ID": "",
                                        "CLIENT_ID": "",
                                    }
                                    //
                                    //
                                    response = {
                                        err: false,
                                        data: result,
                                        clientIds: Ids,
                                        folio_det,
                                        message: 'success!'
                                    }
                                    //
                                    res.send(JSON.parse(JSON.stringify(response)))
                                })



                            } else {
                                response = {
                                    err: true,
                                    message: 'check folio no/ no data found !'
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
                } else {
                    console.log('Err:', +err)
                    response = {
                        err: true,
                        data: [],
                        message: 'fail'
                    }
                    res.send(JSON.stringify(response))
                }
            }


        });

    } catch (err) {
        console.log('Err', + err)
    }
}


module.exports = { dividendMastCtrl }







