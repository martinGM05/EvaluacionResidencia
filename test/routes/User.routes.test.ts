import request from 'supertest'
import app from '../../lib/server';

describe('UserRoutes', () => {
    it('Should get all users', async () => {
        const users = await request(app).get('/user')
        expect(users.status).toBe(200)
    })
})