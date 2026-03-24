import { tokenService } from "./tokenService.js";

export const authCheck = async ({req}) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return { user: null };

    const token = authHeader.split(' ')[1];
        
    if(!token) return {user: null}      

    const userPayload = tokenService.verifyToken(token);

    return {user: userPayload};
}