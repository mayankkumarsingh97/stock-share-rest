//
var connectToOracle = require('../../config/db')
// const redis = require('redis');
// const client = redis.createClient();
//
//
// --------------------------------------
//To get folioController escoshare users
// -------------------------------------



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
            connection.execute(`${query}`, [folio_no], (err, results) => {
                //
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
                                //
                                holding_det: {}
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

        });

    } catch (err) {
        console.log('Err', + err)
    }
}


module.exports = { folioController }



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

