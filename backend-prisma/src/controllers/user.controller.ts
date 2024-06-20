import { Request, Response } from "express";
import { UserService } from "../services/user.service";



let servoce = new UserService
export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            let { firstname, lastname, email, password } = req.body
            let response = await servoce.createUser(req.body)
            return res.json(response)
        } catch (error) {
            const ret =res.json({error})
            return ret;
            console.error('Error:',error)
            
            
        }


    }

    async viewAllUsers(req: Request, res: Response) {
        try {
            let response = await servoce.viewAllUsers()
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            let response = await servoce.deleteUser(req.params.userId)
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            let response = await servoce.updateUser(req.params.userId, req.body)
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }


    async userCount(req: Request, res: Response) {
        try {
            let response = await servoce.userCount()
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }

   
   

    async getUserById(req: Request, res: Response) {
        try {
            let response = await servoce.getUserById(req.params.userId)
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }

    //soft delete functonality ctrl
    async softDeleteUser(req: Request, res: Response) {
        try {
            let response = await servoce.softDeleteUser(req.params.userId)
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }

    async restoreUser(req: Request, res: Response) {
        try {
            let response = await servoce.undeleteUser(req.params.userId)
            return res.json(response)
        } catch (error) {
            console.error('Error:',error)
            return res.json({error})
        }
    }
    
    
}