// const { query } = require('express');
const connectToOracle = require('../../config/db')
// const oracledb = require('oracledb');
//
//
//
const nameAddressQuery = (req, res) => {
    //
    const { folio_no, name_first, name_middle, name_last, holding } = req.body
    //
    const limit = req.body.limit || 200
    const page = req.body.page || 1
    //
    //
    if (!folio_no && !name_first && !name_middle && !name_last && !holding) {
        //
        const response = {
            err: true,
            message: 'Err: folio_no missing or name missing'
        }
        return res.send(JSON.stringify(response))
    }

    try {
        connectToOracle().then((connection) => {
            var SqlTot = `SELECT Count(1) as TotalCnt FROM folio_master fm Left Join holding_tab  htb on 
            fm.FOLIO_NUMBER = htb.folio_no 
            WHERE  htb.security_code =1`;
            //
            //
            let query = `
            SELECT fm.folio_number, fm.name_first, fm.name_middle, fm.name_last, fm.ADD1,fm.ADD2,fm.ADD3, htb.HOLDING,
            rownum as run  FROM folio_master fm Left Join holding_tab  htb on 
            fm.FOLIO_NUMBER = htb.folio_no 
            WHERE rownum < = :limit AND htb.security_code =1
            `
            //
            //
            const folio_filter = `AND fm.folio_number LIKE '${folio_no}'`
            if (folio_no) {
                query += folio_filter
                SqlTot += folio_filter
            }
            //
            const fs_name_filter = `AND fm.name_first LIKE UPPER('${name_first}%')`
            if (name_first) {
                query += fs_name_filter
                SqlTot += fs_name_filter
            }
            //
            const md_name_filter = `AND fm.name_middle LIKE UPPER('${name_middle}%')`
            if (name_middle) {
                query += md_name_filter
                SqlTot += md_name_filter
            }
            //
            //
            const ls_name_filter = `AND fm.name_last LIKE UPPER('${name_last}%')`
            if (name_last) {
                query += ls_name_filter
                SqlTot += ls_name_filter
            }
            //
            //
            const holding_filter = `AND htb.holding LIKE UPPER('${holding}')`
            if (holding) {
                query += holding_filter
                SqlTot += holding_filter
            }
            //
            connection.execute(query, [limit], (err, results) => {
                //
                if (!err) {
                    if (results.rows.length > 0) {
                        const result = results.rows.map(function (row) {
                            return {
                                folio_no: row[0],
                                name_first: row[1],
                                name_last: row[3],
                                name_middle: row[2],
                                ADD1: row[4],
                                ADD2: row[5],
                                ADD3: row[6],
                                holding: row[7],
                            };
                        });
                        //
                        //
                        connection.execute(SqlTot, (err, results) => {
                            if (!err && results.rows.length) {
                                const toTLen = results.rows.map(function (row) {
                                    return {
                                        length: row[0]
                                    }
                                })
                                response = {
                                    err: false,
                                    toTLen,
                                    data: result, message: 'success!',
                                }
                                //
                                res.status(200).json(response);
                            }
                            else {
                                console.log(err, 'Err')
                                res.status(400).json(err.message);
                            }
                        })

                    }//if no data aga. input....
                    else {
                        response = {
                            err: true,
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

module.exports = { nameAddressQuery }