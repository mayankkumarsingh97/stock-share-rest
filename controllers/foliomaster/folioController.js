//
//
var connectToOracle = require('../../config/db')
// const redis = require('redis');
// const client = redis.createClient();
//
//
// --------------------------------------
//To get folioController escoshare users
// --------------------------------------
//

const folioController = (req, res) => {
    const { folio_no, meeting_date } = req.body
    //
    if (!folio_no || !meeting_date) {
        return res.send(JSON.stringify('Err: folio_no missing or meeting_date'))
    }

    try {
        connectToOracle().then((connection) => {
            let query = `SELECT * FROM folio_master where folio_number=:folio_no`;
            //
            let query1 = `SELECT dp_id, client_id FROM cdsl_dcf_mast WHERE folio_no=:folio_no`
            //
            if (folio_no > 500000 && folio_no < 9999999) {
                connection.execute(query1, [folio_no], (err, results) => {

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
                                    const result = {};
                                    results.metaData.forEach((meta, index) => {
                                        result[meta.name] = results.rows[0][index];
                                    });

                                    response = {
                                        err: false,
                                        data: {
                                            holding_det: result,
                                            //
                                            clientIds: Ids
                                        },
                                        message: 'success!'
                                    }
                                    //
                                    res.send(JSON.parse(JSON.stringify(response)))

                                } else {
                                    response = {
                                        err: false,
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
                connection.execute(query1, [folio_no], (err, results) => {

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
                                    const result = {};
                                    results.metaData.forEach((meta, index) => {
                                        result[meta.name] = results.rows[0][index];
                                    });

                                    response = {
                                        err: false,
                                        data: {
                                            holding_det: result,
                                            //
                                            clientIds: Ids
                                        },
                                        message: 'success!'
                                    }
                                    //
                                    res.send(JSON.parse(JSON.stringify(response)))

                                } else {
                                    response = {
                                        err: false,
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
                    connection.execute(`${query}`, [folio_no], (err, results) => {
                        //
                        if (!err) {
                            if (results.rows.length > 0) {
                                const result = {};
                                results.metaData.forEach((meta, index) => {
                                    result[meta.name] = results.rows[0][index];
                                });

                                response = {
                                    err: false,
                                    data: {
                                        holding_det: result,
                                        //
                                        clientIds: Ids
                                    },
                                    message: 'success!'
                                }
                                //
                                res.send(JSON.parse(JSON.stringify(response)))

                            } else {
                                response = {
                                    err: false,
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


module.exports = { folioController }





// IF <folio_no>  > 700000  && <folio_no>  < 9999999 THEN
//    > select dp_id, client_id FROM nsdl_dcf_mast WHERE folio_no = <folio_no>
// Else IF <folio_no>  > 401000  && <folio_no>  < 700000 THEN
//    > select dp_id, client_id FROM cdsl_dcf_mast WHERE folio_no = <folio_no>
// ELSE
//       “dp_id”: ””,
//       “client_id”:””,


// // folio_det : {}
// :> SELECT * FROM folio_master where folio_no = <folio_no> ;



// // holding_det :  {}
// :> SELECT * FROM holding_tab where folio_no = <folio_no> and security_code='1';

// IF ( meeting_date != “”) {
// Query += “ AND meeting_date = ‘<meeting_date>’;
// }



// const folioController = (req, res) => {
//     const { folio_no, meeting_date } = req.body

//     client.get(folio_no, (err, result) => {
//         console.log('response from cache')
//         if (result) {
//             res.json(result);
//         } else {
//             console.log('response from db')
//             getFolioDetailbyID(req, res);
//         }
//     });
// }





// const folioController = (req, res) => {
//     const { folio_no, meeting_date } = req.body

//     const cache_data = client.get()
//     //
//     if (!folio_no || !meeting_date) {
//         return res.send(JSON.stringify('Err: folio_no missing or meeting_date'))
//     }

//     try {
//         connectToOracle().then((connection) => {
//             let query = `SELECT * FROM folio_master where folio_number=:folio_no`;
//             //
//             connection.execute(`${query}`, [folio_no], (err, results) => {
//                 //
//                 //
//                 if (!err) {
//                     if (results) {
//                         const result = {};
//                         results.metaData.forEach((meta, index) => {
//                             result[meta.name] = results.rows[0][index];
//                         });

//                         response = {
//                             err: false,
//                             data: {
//                                 dp_id: "",
//                                 client_id: "",
//                                 folio_det: result,
//                                 //
//                                 holding_det: {}
//                             },
//                             message: 'success!'
//                         }
//                         //
//                         res.send(JSON.parse(JSON.stringify(response)))

//                     } else {
//                         response = {
//                             err: false,
//                             message: 'check folio no/ no data found !'
//                         }
//                         res.send(JSON.stringify(response))
//                     }

//                 } else {
//                     response = {
//                         err: true,
//                         data: [],
//                         message: 'fail'
//                     }
//                     res.send(JSON.stringify(response))
//                 }
//             });

//         });

//     } catch (err) {
//         console.log('Err', + err)
//     }
// }

