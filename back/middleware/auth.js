const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        Object.assign(req.body, { userId: userId});
        // console.log("API Called : req.body.userId="+req.body.userId + " req.body._id="+ req.body._id);
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({ 'error': 'Invalid request!'});
        } else {
            next();
        }
    } catch {
        res.status(401).json({ 'error': 'Invalid request!' });
    }
};