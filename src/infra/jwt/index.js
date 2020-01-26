let jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
const issuer = process.env.JWT_ISSUER;

module.exports.sign = (subject, payload={}) => {

    const options = {
        expiresIn,
        issuer,
        subject
    }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, function(err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};

module.exports.verify = token => {
    const options = {
        issuer
    }

    return new Promise((resolve, reject) => {    
        jwt.verify(token, secret, options, function(err, decoded) {
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
};