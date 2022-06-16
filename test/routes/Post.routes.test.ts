import request from 'supertest'
import app from '../../lib/server';

describe('PostRoutes', () => {
    it('Should get all posts', async () => {
        const posts = await request(app).get('/post?page=2&width=3&authorId=1')
        expect(posts.status).toBe(200)
    })
})