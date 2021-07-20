const jwt = require("jsonwebtoken");

async function checkJwtToken(req, res, next)

    try {
        if (req.headers && req.headers.authorization) {
            let jwtToken = req.headers.authorization.slice(7);

            let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY);
        }
    }