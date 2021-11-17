
const jwt = require('../services/jwt');

module.exports = (req, res, next) => {
    try {
        let token = request.headers['authorization'];
        const payload = jwt.validateToken(token);
        req.body.id = payload.userId
        next();
    } catch (error) {
        response.status(500).json(error.message);
    }
}