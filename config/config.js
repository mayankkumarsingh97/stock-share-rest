const oracledb = require('oracledb');

async function connectToOracle() {
    try {
        // Connection credentials
        const connection = await oracledb.getConnection({
            user: "ESCOSHARE ",
            password: "ESCOSHARE ",
            connectString: "ESCOSHARE ",
            externalAuth: false
        });

        // await connection.close();
        return connection
    } catch (err) {
        console.error("Error connecting to Oracle database:", err);
    }
}


module.exports = connectToOracle;
