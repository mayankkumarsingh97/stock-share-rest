const oracledb = require('oracledb');

async function connectToOracle() {
    try {
        const connection = await oracledb.getConnection({
            user: "ESCOSHARE ",
            password: "ESCOSHARE ",
            connectString: "ESCOSHARE ",
            externalAuth: false
        });

        return connection
    } catch (err) {
        console.error("Error connecting to Oracle database:", err);
    }
}

module.exports = connectToOracle;
