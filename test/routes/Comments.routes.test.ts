import request from 'supertest'
import app from '../../lib/server';

describe('CommentsRoutes', () => {
    it('Should get all comments for an activity', async () => {
        const comments = await request(app).get('/post/3/comments')
        expect(comments.status).toBe(200)
    })
})