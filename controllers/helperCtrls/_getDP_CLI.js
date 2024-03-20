//
const connectToOracle = require('../../config/db')
const oracledb = require('oracledb');
//
//
const get_DP_CLI_Ctrl = (req, res) => {
    //
    const { dp_id, client_Id } = req.body
    //
    //
    if (!dp_id && !client_Id) {
        //
        const response = {
            err: true,
            message: 'Err: DP_ID OR CLIENT ID missing!'
        }
        return res.send(JSON.stringify(response))
    }

    try {
        connectToOracle().then((connection) => {
            //
            const query = `select FOLIO_NO from nsdl_dcf_mast where client_id=:clientId and dp_id=:dpid`
            //
            connection.execute(query, [client_Id, dp_id], (err, results) => {
                //
                //
                if (!err) {
                    if (results.rows.length > 0) {
                        //
                        const result = {};
                        results.metaData.forEach((meta, index) => {
                            result[meta.name] = results.rows[0][index];
                        });
                        //
                        response = {
                            err: false, result,
                            message: 'success!'
                        }
                        //
                        return res.status(200).json(response);
                        
                    }//
                    else {
                        const query = `select FOLIO_NO from cdsl_dcf_mast where client_id=:clientId and dp_id=:dpid`
                        //
                        connection.execute(query, [client_Id, dp_id], (err, results, next) => {
                            //
                            if (results.rows && results.rows.length > 0) {
                                const result = {};
                                results.metaData.forEach((meta, index) => {
                                    result[meta.name] = results.rows[0][index];
                                });
                                //
                                response = {
                                    err: false, result,
                                    message: 'success!'
                                }
                                //
                                res.status(200).json(response);
                            } else {
                                response = {
                                    err: true,
                                    message: 'no data found! Please check DP_ID or CLIENT_ID'
                                }
                                //
                                res.status(200).json(response);
                            }
                        })
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

module.exports = { get_DP_CLI_Ctrl }