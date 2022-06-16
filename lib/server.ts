import express from 'express';
import cors from 'cors';
import userRouter from './routes/User.routes';
import postRouter from './routes/Post.routes';
import commentsRouter from './routes/Comments.routes';
import authorRouter from './routes/Author.routes';

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comments', commentsRouter)
app.use('/author', authorRouter)

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    })
})


export default app;