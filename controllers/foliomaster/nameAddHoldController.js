const connectToOracle = require('../../config/db')

const nameAddressQuery = (req, res) => {
    //
    const { folio_no, name_first, name_middle, name_last } = req.body
    //
    console.log(folio_no, 'folio_no')
    console.log(name_first, 'meeting_date')
    console.log(name_middle, 'name_middle')
    console.log(name_last, 'name_last')

    if (!folio_no || !name_first) {
        const response = {
            err: true,
            data: [],

        }
        return res.send(JSON.stringify('Err: folio_no missing or name missing'))
    }

    try {
        connectToOracle().then((connection) => {
            //
            let query = `select fm.*, htb.holding from folio_master fm 
            Left Join holding_tab htb on fm.FOLIO_NUMBER = htb.folio_no  
            WHERE fm.SECURITY_CODE= '1'`;
            //
            // let query = `select fm.*, htb.holding from folio_mas fm `;
            //
            connection.execute(`${query}`, [folio_no], (err, results) => {
                //
                if (!err) {
                    if (results) {
                        const result = {};
                        results.metaData.forEach((meta, index) => {
                            result[meta.name] = results.rows[0][index];
                        });
                        //
                        //
                        response = {
                            err: false,
                            data: {
                                dp_id: "",
                                client_id: "",
                                folio_det: result,
                                holding_det: {

                                }
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

module.exports = { nameAddressQuery }