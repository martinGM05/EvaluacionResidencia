import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

interface activitiesI {
    id: number;
    type: type;
    title?: string;
    content: string;
    createdAt: string;
}

enum type {
    POST = 'POST',
    COMMENT = 'COMMENT',
}

class AuthorController {

    static async getActivities(req: Request, res: Response) {
        const { id } = req.params

        try {
            const activities = await prisma.t2_appuser.findMany({
                where: { id: Number(id) },
                include: { t2_post: true, t2_comment: true },
            })

            const activitiesList: activitiesI[] = []

            activities.forEach(activity => {
                activity.t2_post.forEach(post => {
                    activitiesList.push({
                        id: post.id,
                        type: type.POST,
                        title: post.title,
                        content: post.content,
                        createdAt: post.created_at!.toISOString(),
                    })
                })
                activity.t2_comment.forEach(comment => {
                    activitiesList.push({
                        id: comment.id,
                        type: type.COMMENT,
                        content: comment.content,
                        createdAt: comment.created_at!.toISOString(),
                    })
                })

            })

            if (activitiesList.length === 0) {
                res.status(404).json({
                    message: "No activities found",
                })
            } else {
                res.status(200).json(activitiesList)
            }
        } catch (error) {
            res.status(500).json({
                message: "Error getting activities: " + error,
            })
        }

    }

}

export default AuthorController;
