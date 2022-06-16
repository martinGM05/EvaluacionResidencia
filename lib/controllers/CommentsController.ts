import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

class CommentsController {

    static async createComment(req: Request, res: Response) {
        const { content, authorId, postId } = req.body;

        if (!content || !authorId || !postId) {
            res.status(400).send("Content, authorId and postId are required");
            return;
        }

        if (typeof content !== 'string' || typeof authorId !== 'number' || typeof postId !== 'number') {
            res.status(400).send("Content must be a string, authorId and postId must be numbers");
            return;
        }

        try {
            const comment = await prisma.t2_comment.create({
                data: { content, author_id: authorId, post_id: postId }
            })
            res.status(201).json(comment)
        } catch (error) {
            res.status(500).json({
                message: "Error creating comment: " + error,
            })
        }
    }

    static async getAllComments(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            res.status(400).send("id is required");
            return;
        }

        try {
            const comments = await prisma.t2_comment.findMany({
                where: { post_id: Number(id) },
                include: { t2_appuser: true }
            })

            const model = {
                comments: comments.map(comment => {
                    return {
                        id: comment.id,
                        content: comment.content,
                        createdAt: comment.created_at!.toISOString(),
                        author: {
                            id: comment.t2_appuser.id,
                            name: comment.t2_appuser.email,
                        }
                    }
                })
            }

            res.status(200).json(model.comments)
        } catch (error) {
            res.status(500).json({
                message: "Error getting comments: " + error,
            })
        }

    }

}

export default CommentsController;
