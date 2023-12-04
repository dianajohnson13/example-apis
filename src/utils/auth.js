import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const makeTokens = ({ user_id, user_name, user_email }, authType = "user") => {
    const user = { user_id, user_name, user_email, auth_type: authType };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    return { accessToken, refreshToken };
}

export const genAPIKey = () => {
    return uuidv4();
};