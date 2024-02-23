const { query } = require('express');
const connectToOracle = require('../../config/db')
const oracledb = require('oracledb');

//
//
const nameAddressQuery = (req, res) => {
    //
    const { folio_no, name_first, name_middle, name_last } = req.body
    //
    if (!folio_no) {
        //
        const response = {
            err: true,
            message: 'Err: folio_no missing or name missing'
        }
        return res.send(JSON.stringify(response))
    }

    try {
        connectToOracle().then((connection) => {
            //
            const query = `
            select   fm.folio_number, fm.name_first, fm.name_middle, fm.name_last, fm.ADD1, htb.HOLDING,
            rownum as run  from folio_master fm Left Join holding_tab  htb on 
            fm.FOLIO_NUMBER = htb.folio_no 
            where rownum < = 100 AND htb.security_code =1 
            `
            //
            const folio_filter = `fm.folio_number LIKE '%${folio_no}%'`
            const fs_name_filter = `fm.name_first LIKE '%${name_first}%'`
            const ls_name_filter = `fm.name_last LIKE '%${name_last}%'`
            const md_name_filter = `fm.name_middle LIKE '%${name_middle}%'`
            //
            //
            connection.execute(query,
                (err, results) => {
                    //
                    if (!err) {
                        if (results.rows.length > 0) {
                            if (folio_filter + fs_name_filter + ls_name_filter + md_name_filter) {
                                return true
                            }
                            const result = results.rows.map(function (row, index) {
                                const arr = results.metaData.map((data, index) => index)
                                return {
                                    name_first: row[0],
                                    name_first: row[1],
                                    name_last: row[2],
                                    name_middle: row[3],
                                    ADD1: row[4],
                                    holding: row[5],
                                };
                            });
                            //
                            //
                            response = {
                                err: false, data: result,
                                message: 'success!'
                            }
                            //
                            res.status(200).json(response);

                        }//if no data aga. input.....
                        else {
                            response = {
                                err: false,
                                message: 'no data found/ check folio_no or other inputs'
                            }
                            res.json(response)
                        }

                    }//if not err
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


    //
    //
    // let query = `select  fm.*, htb.* , rownum as run  from folio_master fm Left Join holding_tab  htb on fm.FOLIO_NUMBER = htb.folio_no where rownum < =50 AND htb.security_code ='1'`;
    //
    //



    // let query = `
    // select  fm.folio_number, fm.name_last, fm.name_middle, fm.name_last, fm.ADD1, htb.HOLDING,
    // rownum as run  from folio_master fm Left Join holding_tab  htb on 
    // fm.FOLIO_NUMBER = htb.folio_no 
    // where rownum < = 20 AND htb.security_code = 1 AND (fm.name_first LIKE ? OR ='')
    // `

    // const query = `
    // SELECT fm.*, htb.holding 
    // FROM folio_mas fm 
    // LEFT JOIN holding_tab htb ON fm.FOLIO_NUMBER = htb.folio_no  
    // WHERE fm.security_code = '1' 
    // AND (fm.FOLIO_NUMBER LIKE ? OR ? = '')
    // OR (fm.NAME_FIRST LIKE ? OR ? = '')
    // OR (fm.NAME_MIDDLE LIKE ? OR ? = '')
    // OR (fm.NAME_LAST LIKE ? OR ? = '')
    // `

}

module.exports = { nameAddressQuery }