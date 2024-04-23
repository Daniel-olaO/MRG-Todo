import { app } from '../src/app';
import request from "supertest";


describe('Task Tests', () => {
    it('it should create a task', async() => {
        request(app)
        .post('/api/create-task')
        .expect(200)
        .expect('Content-Type', 'application/json')
    })
    it('should return tasks', async() => {
        request(app)
        .get('/api/task')
        .expect(200)
        .expect('Content-Type', 'application/json')
    })
    it('should update a task', async() => {
        request(app)
        .put('/api/update-task')
        .expect(200)
        .expect('Content-Type', 'application/json')
    })
    it('should delete a task', async() => {
        request(app)
        .delete('/api/delete-task')
        .expect(204)
    })  
})