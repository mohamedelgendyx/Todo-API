const JWT = require('jsonwebtoken');
module.exports = (request, response, next) => {
    try {
        const token = request.get("authorization")?.split(" ")[1];
        const decodedToken = JWT.verify(token, process.env.secretKey);
        request.decodedToken = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
}