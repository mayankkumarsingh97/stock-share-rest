const { query } = require('express');
const connectToOracle = require('../config/db')
const oracledb = require('oracledb');
//
//
//
const _getPhyHol = (req, res) => {
    //
    const { folio_no } = req.body
    //
    if (!folio_no) {
        //
        const response = {
            err: true,
            message: 'Err:folio number missing!'
        }
        return res.send(JSON.stringify(response))
    }

    try {
        connectToOracle().then((connection) => {
            //
            //
            const query = `
            select holding from holding_tab where folio_no=:folio_no
            `
            connection.execute(query, (err, results) => {
                //
                //
                if (!err) {
                    if (results.rows.length > 0) {
                        const result = {};
                        results.metaData.forEach((meta, index) => {
                            result[meta.name] = results.rows[0][index];
                        });

                        response = {
                            err: false,
                            result,
                            message: 'success!'
                        }
                        //

                        res.status(200).json(response);

                    }//
                    else {
                        response = {
                            err: false,
                            message: 'no data found/ check  inputs date or folio number'
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

module.exports = { _getPhyHol }