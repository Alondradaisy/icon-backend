const jwt = require("jsonwebtoken");

async function checkJwtToken(req, res, next)

    try {
        if (req.headers && req.headers.authorization) {
            let jwtToken = req.headers.authorization.slice(7);

            let decodedJwt = jwt.verify(jwtToken, process.env.PRIVATE_JWT_KEY);
            res.locals.decodedJwt = decodedJwt;

            next();
            console.log(decodedJwt);
            console.log(decodedJwt.message);

        } else {
            throw { message: "You don't have permission to access!", statusCode: 500 };
        }

    } catch (e) {
        return next (e);
        console.log(e.message);
        console.log(e.code);
        res.status(e.statusCode).json({ message: e.message, error: e });
    }

    module.exports = checkJwtToken;