const jwt = require('jsonwebtoken')
const { UNAUTHORİZED } = require("../constans/messages")
const authMiddleware = (req, res, next) => {
    const accessToken = req.headers['access-token'];
    if (!accessToken) res.status(401).json({ message: UNAUTHORİZED });
    else{
        try {
            const decoded = jwt.verify(accessToken, process.env.TOKEN_PRIVATE_KEY);
            req.user = decoded;
            
            next();
        } catch (error) {
            res.status(401).json({ message: UNAUTHORİZED });
        }
    }
}

module.exports = authMiddleware