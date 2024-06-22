import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../interfaces/user";
import { v4 } from "uuid";
import bcrypt from 'bcrypt';

export class UserService {
    prisma = new PrismaClient({
        log:['error']
    });


    async createUser(user: User) {
        const hashedPW = await bcrypt.hash(user.password, 10);
        try {
            await this.prisma.user.create({
                data: {
                    userId: v4(),
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    password: hashedPW,
                    profileImage:user.profileImage               
                }
            });

            return {
                message: "User created successfully",
                responseCode: 200
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Check if the error code is P2002, which indicates a unique constraint violation
                if (error.code === 'P2002') {
                    return {
                        message: "User already exists :)",
                        responseCode: 400
                    };
                }
            }
            return {
                message: "An unexpected error occurred.",
                responseCode: 500
            };
        }
    }

   
    async viewAllUsers() {
        const users = await this.prisma.user.findMany();
        return users;
    }

    
    async deleteUser(userId: string) {
        try {
            const user = await this.prisma.user.delete({
                where: {
                    userId: userId
                }
            });
            return user;
        } catch (error) {
            return {
                message: "404 User Not Found :(",
                
            };
        }
    }

  
    async updateUser(userId: string, user: User) {
        try {
            const hashedPW = await bcrypt.hash(user.password, 10);
            const updatedUser = await this.prisma.user.update({
                where: {
                    userId: userId
                },
                data: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    password: hashedPW,
                    profileImage:user.profileImage
                }
            });
            return{
                message: "User updated Succesfuly :)",
                user:  updatedUser
            }
        } catch (error) {
            return {
                message: "404 User Not Found :(",
                
            };
        }
    }
   
    async userCount() {
        const count = await this.prisma.user.count();
        return count;
    }


    

  
    async getUserById(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                userId: userId
            }
        });
        return user;
    }

    
    async softDeleteUser(userId: string) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    userId: userId
                },
                data: {
                    accountStatus: "inactive",
                    isNotified: false
                }
            });
            return{
                message: "User soft deleted successfully :)",
            };
        } catch (error) {
            return {
                message: "404 User Not Found :(",                
            };
        }
    }
    
    async undeleteUser(userId: string) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    userId: userId
                },
                data: {
                    accountStatus: "active",
                    isNotified: true
                }
            });
            return{
                message: "User undeleted successfully :)",
            };
        } catch (error) {
            return {
                message: "404 User Not Found :(",
            };
        }
    }
    
}