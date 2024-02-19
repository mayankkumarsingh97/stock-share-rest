const jwt = require('jsonwebtoken');
//------------------------------------------------------------------------------
// -------------------- Middleware for verifying JWT token ---------------------
// -----------------------------------------------------------------------------
function verifyJsonWebToken(req, res, next) {
    const headerObject = req.headers
    const token = headerObject.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ err: true, message: "Token not provided" });
    }

    jwt.verify(token, 'Mh!9968@#Esc', (err, decoded) => {
        if (err) {
            return res.status(401).json({ err: true, message: "Invalid token or expired" });
        }

        req.user = decoded;
        next();
    });
}

module.exports = { verifyJsonWebToken }