const jwt = require('jsonwebtoken')

//middleware to verify jwt token

const verifyToken = function (req, res, next) {

    const bearerHeader = req.headers['_token'];

    if (!bearerHeader)
        return res.status(401).json({ message: 'Missing token.' })

    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
        if (err) return res.status(401).json({ message: 'Invalid token.' })

        req.authData = authData;
        next();
    });

}

module.exports = {
    verifyToken
}
