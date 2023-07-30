import { app } from '../src/server'
import * as db from './db'
import supertest from 'supertest'
import {
   validTask,
   TaskMissingTaskName,
   TaskMissingDate,
   TaskWithWrongDataType,
   TaskWithWrongDate
} from './mockData'
const request = supertest(app)
describe('Test request with mongoose', () => {
   beforeAll(async () => {
      await db.connect()
   });
   afterEach(async () => {
      await db.clearDatabase()
   });
   afterAll(async () => {
      await db.closeDatabase()
   });

   test('GET - /api', async () => {
      const res = await request.get('/api').send();
      const body = res.body;
      const message = body.message;
      expect(res.statusCode).toBe(200);
      expect(message).toBe('Welcome to MRG todo API!');
   });
   test('should create a new Task', async() => {
    const res = await request.post('/api/create-task').send(validTask)
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
   });
   test('should fail if gave an incorrect date', async () => {
      const res = await request.post('/api/create-task').send(TaskWithWrongDate)
      expect(res.statusCode).toEqual(400)
      expect(res.body).toHaveProperty('message')
   });
   test('should return all tasks', async () => {
    const res = await request.get('/api/task').send()
    expect(res.statusCode).toEqual(200);
   });
   test('should fail if the data has no title', async () => {
    const res = await request.post('/api/create-task').send(TaskMissingTaskName)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
   });
   test('should fail if the data has no date', async () => {
    const res = await request.post('/api/create-task').send(TaskMissingDate)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
   });
   test('should fail if the data should have the wrong dataType', async () => {
    const res = await request.post('/api/create-task').send(TaskWithWrongDataType)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
   });
});