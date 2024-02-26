const { query } = require('express');
const connectToOracle = require('../../config/db')
const oracledb = require('oracledb');

//
//
const securityTypeCtrl = (req, res) => {
    //
    const { folio_no } = req.body
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
            const query = `SELECT * from holding_tab where security_code =1 and folio_no=312484`

            connection.execute(query,
                (err, results) => {
                    //
                    if (!err) {
                        if (results.rows.length > 0) {

                            const result = results.rows.map(function (row, index) {

                                return {

                                };
                            });
                            //
                            //
                            response = {
                                err: false, data: result,
                                message: 'success!'
                            }
                            //
                            res.status(200).json(results);

                        }//if no data aga. input.....
                        else {
                            response = {
                                err: false,
                                message: 'no data found/ check folio_no or other inputs'
                            }
                            res.json(response)
                        }

                    }//if not err ......
                    else {
                        console.log(err, 'err')
                        response = {
                            err: true,
                            data: [],
                            message: 'fail'
                        }
                        res.status(400).send(JSON.stringify(response))
                    }
                });

        });

    } catch (err) {
        console.log('Err', + err)
    }




}

module.exports = { securityTypeCtrl }