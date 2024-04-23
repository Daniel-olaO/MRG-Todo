/* eslint-disable @typescript-eslint/no-floating-promises */
import { app } from '../src/server'
import * as db from './db'
import supertest from 'supertest'
import {
  validTask,
  TaskMissingTaskName,
  TaskMissingDate,
  TaskWithWrongDataType,
  TaskWithWrongDate,
  TaskUpdateData
} from './mockData'

const request = supertest(app)
let taskId: string = ''
const dummyTaskId: string = '5f9e9b3b9b0b3c1b3c1b3c1b'

describe('Test request with mongoose', () => {
  beforeAll(async () => {
    db.connect()
  })
  afterAll(async () => {
    db.disconnect()
  })

  test('GET - /api', async () => {
    const res = await request.get('/api').send()
    const body = res.body
    const message = body.message
    expect(res.statusCode).toBe(200)
    expect(message).toBe('Welcome to MRG todo API!')
  })
  test('should create a new Task', async () => {
    const res = await request.post('/api/create-task').send(validTask)
    taskId = res.body._id
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('_id')
  })
  test('should return a task by id', async () => {
    const res = await request.get(`/api/task/${taskId}`).send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
  })
  test('should update a task', async () => {
    const res = await request.put(`/api/update-task/${taskId}`).send(TaskUpdateData)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.isCompleted).toBeFalsy()
  })
  test('should complete a task', async () => {
    const res = await request.put(`/api/complete-task/${taskId}`).send()
    expect(res.statusCode).toEqual(200)
    expect(res.body.isCompleted).toBeTruthy()
  })
  test('should delete a task', async () => {
    const res = await request.delete(`/api/delete-task/${taskId}`).send()
    expect(res.statusCode).toEqual(204)
  })
  test('should fail if the task does not exist', async () => {
    const res = await request.get(`/api/task/${dummyTaskId}`).send()
    expect(res.statusCode).toEqual(403)
    expect(res.body).toHaveProperty('message')
  })
  test('should fail if gave an incorrect date', async () => {
    const res = await request.post('/api/create-task').send(TaskWithWrongDate)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })
  test('should return all tasks', async () => {
    const res = await request.get('/api/task').send()
    expect(res.statusCode).toEqual(200)
  })
  test('should fail if the data has no title', async () => {
    const res = await request.post('/api/create-task').send(TaskMissingTaskName)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })
  test('should fail if the data has no date', async () => {
    const res = await request.post('/api/create-task').send(TaskMissingDate)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })
  test('should fail if the data should have the wrong dataType', async () => {
    const res = await request.post('/api/create-task').send(TaskWithWrongDataType)
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message')
  })
})
