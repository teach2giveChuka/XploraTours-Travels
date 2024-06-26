import { Request } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { tokenInfo } from "../interfaces/user";

export const getIdFromToken = (req: Request): string =>{

    try {
        const token = req.headers['token'] as string;

        if(!token){
            return ""
        }
        let data: string | JwtPayload = jwt.verify(token, process.env.SECRET_KEY as string) as tokenInfo

        if (typeof data === 'string') {
            return ""
        } else if (data['userId']) {
            return data.userId;
        } else {
            return ""
        }
    } catch (error) {
        return ''
    }
}
