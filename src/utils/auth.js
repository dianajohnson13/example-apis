import jwt from 'jsonwebtoken';

export const makeTokens = (user) => {
    const accessToken = jwt.sign(user, (process.env.ACCESS_TOKEN_SECRET), {expiresIn: '15m'});
    const refreshToken = jwt.sign(user, (process.env.REFRESH_TOKEN_SECRET), {expiresIn: '5d'});
    return { accessToken, refreshToken };
}