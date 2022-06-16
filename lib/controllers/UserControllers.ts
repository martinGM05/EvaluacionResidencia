import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
class UserController{

    static async getAllUsers(req: Request, res: Response){
        try {
            const users = await prisma.t2_appuser.findMany()
            res.status(200).json({
                users,
            })
        } catch (error) {
            res.status(500).json({
                message: "Error getting users",
            })
        }
    }

    static async createUser(req: Request, res: Response){
        const { email } = req.body;

        if(!email){
            res.status(400).send("Email is required");
        }
        
        if(typeof email !== 'string'){
            res.status(400).send("Email must be a string");
        }

        try {
            const user = await prisma.t2_appuser.create({
                data: { email }
            })
            res.status(201).json({
                id: user.id,
            })
        } catch (error) {
            res.status(500).json({
                message: "Error creating user: " + error,
            })
        }
    }

}

export default UserController;
