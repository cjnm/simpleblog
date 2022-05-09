import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    const id = req.headers['x-user-id'];
    const username = req.headers['x-user-username'];
    const avatar_url = req.headers['x-user-avatar'];
    const token = req.headers['authorization'].split(' ')[1];

    if (!token || !id || !username) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, `${JWT_SECRET}-${id}`);

        if (isTokenExpired(decoded.exp)) {
            return res.status(401).json({
                success: false,
                status: 401,
                message: "Token expired"
            });
        }

        req.username = decoded.username;
        req.id = decoded.id;
        req.avatar_url = avatar_url;
    } catch (err) {
        return res.status(401).json({
            success: false,
            status: 401,
            message: "Unauthorized"
        });
    }
    return next();
};

const isTokenExpired = (expiry) => {
    if (!expiry) {
        return true;
    }

    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

export { auth };