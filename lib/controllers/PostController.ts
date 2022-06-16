import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
class PostController {

    static async getAllPosts(req: Request, res: Response) {

        const { page = 1, width = 5, authorId } = req.query;
        
        let widthNumber = Number(width);
        let pageNumber = Number(page);

        const posts =
            authorId ? (
                await prisma.t2_post.findMany({
                    where: { author_id: Number(authorId) },
                    include: { t2_appuser: true },
                    orderBy: { created_at: 'asc' },
                })
            ):(
                await prisma.t2_post.findMany({
                    include: { t2_appuser: true },
                    orderBy: { created_at: 'asc' },
                })
            )

        const totalPosts = posts.length;
        const pages = Math.ceil(totalPosts / widthNumber);
        const start = (pageNumber - 1) * widthNumber;
        const end = start + widthNumber;
        const paginatedPosts = posts.slice(start, end);

        res.status(200).json({
            pages,
            page: pageNumber,
            width: widthNumber,
            items: paginatedPosts.map(post => {
                return {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    createdAt: post.created_at!.toISOString(),
                    author: {
                        id: post.t2_appuser.id,
                        email: post.t2_appuser.email,
                    }
                }
            })
        });
    }

    static async createPost(req: Request, res: Response) {

        const { authorId, title, content } = req.body;

        if (!authorId || !title || !content) {
            res.status(400).send("AuthorId, title and content are required");
            return;
        }

        if (typeof authorId !== 'number' || typeof title !== 'string' || typeof content !== 'string') {
            res.status(400).send("AuthorId must be a number, title and content must be strings");
            return;
        }

        try {

            const post = await prisma.t2_post.create({
                data: { author_id: authorId, title, content }
            })

            res.status(201).json({
                id: post.id,
            })

        } catch (error) {
            res.status(500).json({
                message: "Error creating post: " + error,
            })
        }
    }
}

export default PostController;
