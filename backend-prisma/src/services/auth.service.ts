import { PrismaClient } from "@prisma/client";
import { logins } from "../interfaces/logins";
import { User } from "../interfaces/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class AuthService {
    prisma = new PrismaClient({
        log: ['error'],
    });

    async userLogin(user: User) {
        const userExists = await this.prisma.user.findFirst({
            where: {
                email: user.email,
                accountStatus: 'active', 
            },
        });

        if (!userExists) {
            return {
                message: "Account not found :(",
                responseCode: 404,
            };
        }

        const passwordMatch = await bcrypt.compare(user.password, userExists.password);

        if (!passwordMatch) {
            return {
                message: "Invalid password :(",
                responseCode: 401
            };
        }

        const token = await this.createToken(userExists.userId, userExists.email);
        

        return {
            message: "Login successful :)",
            responseCode: 200,
            token,
            role: userExists.role,
            
        };
    }
    
    private createToken(userId: string, email: string): string {
        const secretKey = process.env.SECRET_KEY as string;
        const token = jwt.sign(
            { userId, email },
            secretKey,
            { expiresIn: '1h' } 
        );
        return token;
    }
}