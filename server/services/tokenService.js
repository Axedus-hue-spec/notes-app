import jwt from 'jsonwebtoken'

class TokenService {
    generateToken(payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})
        return token;
    }

    verifyToken(token) {
        const userPayload = jwt.verify(token, process.env.JWT_SECRET)
        return userPayload
    }
}

export const tokenService = new TokenService();