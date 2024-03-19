const { query } = require('express');
const connectToOracle = require('../../config/db')
const oracledb = require('oracledb');
//
//
//
const _get_Dividend_Det_By_Date_Ctrl = (req, res) => {
    //
    const { date, folio_no } = req.body
    //
    if (!date || !folio_no) {
        //
        const response = {
            err: true,
            message: 'Err: date missing or folio number missing!'
        }
        return res.send(JSON.stringify(response))
    }

    try {
        connectToOracle().then((connection) => {
            //
            //
            const query = `
            select  dir_p.description,  dm.*
            from dividend_masters dm 
            Left Join dir_periods  dir_p on dm.date_of_payment = dir_p.date_of_payment 
            where    folio_no=:folio_no  and dm.date_of_payment='${date}'
            `

            connection.execute(query, [folio_no], (err, results) => {
                console.log(results,'resultssssssssssssssss')
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

                    }//if no data aga. input.....
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

module.exports = { _get_Dividend_Det_By_Date_Ctrl }