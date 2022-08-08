const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const header = req.get('x-jwt-kwy');
    if (header == null) return res.status(401).send({
        error: "Missing auth token "
    });

    jwt.verify(header, process.env.TOKEN_KEY, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403)

        if (req.path.toLowerCase() === user.url?.toLowerCase()) {
            req.user = user; //user data from token is in user variable
            next();
        } else {
            res.status(401).send({
                error: "Not Authorized Token for this Request "+req.path
            })
        }
    });
}

module.exports = authenticateToken;