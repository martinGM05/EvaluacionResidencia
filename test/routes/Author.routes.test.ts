import request from 'supertest'
import app from '../../lib/server';

describe('AuthorRoutes', () => {
    it('Should get all activities for an author', async () => {
        const activities = await request(app).get('/author/1/activities')
        expect(activities.status).toBe(200)
    })
    
    it('Should not return activities for an author that does not exist', async () => {
        const activities = await request(app).get('/author/100/activities')
        expect(activities.status).toBe(404)
    })
})