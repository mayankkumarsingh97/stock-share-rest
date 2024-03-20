const { query } = require('express');
const connectToOracle = require('../../config/db')
const oracledb = require('oracledb');

//
//
const InterstMastCtrl = (req, res) => {
    //
    const { folio_no } = req.body
    console.log(folio_no, 'folio no')
    //
    if (!folio_no) {
        //
        const response = {
            err: true,
            message: 'Err: folio_no missing'
        }
        return res.send(JSON.stringify(response))
    }

    try {
        connectToOracle().then((connection) => {
            //
            let query = `
            select  dir_p.description,  dm.date_of_payment,dm.security_code,dm.deb,
            dm.net_interest_amount,dm.warrant_no,dm.micr_no,dm.status_code
            from interest_masters dm 
            Left Join dir_periods  dir_p on dm.date_of_payment = dir_p.date_of_payment 
            where    folio_no=:folio_no
            `;
            //
            //
            let get_folio_details = `SELECT * FROM folio_master where folio_number=:folio_no`;

            //
            if (folio_no) {
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
                                    deb: row[3],
                                    net_interest_amount: row[4],
                                    warrant_no: row[5],
                                    micr_no: row[6],
                                    status_code: row[7],
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

        });

    } catch (err) {
        console.log('Err', + err)
    }




}

module.exports = { InterstMastCtrl }












// const connectToOracle = require("../../config/db")
// const { connect } = require("../../routes/user.route")

// const InterstMastCtrl = (req, res) => {

//     const { folio_no } = req.body

//     try {
//         connectToOracle().then

//     } catch (err) {
//     }


// }


// module.exports = {
//     InterstMastCtrl
// }