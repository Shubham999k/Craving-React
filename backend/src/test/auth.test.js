import request from 'supertest';
import express from 'express';
import AuthRouter from '../routers/auth.route.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use('/auth', AuthRouter);

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                dob: '2000-01-01',
                phone: '1234567890',
                gender: 'male',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User created successfully');
    });

    it('should not register an existing user', async () => {
        await User.create({
            fullName: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            dob: '2000-01-01',
            phone: '1234567890',
            gender: 'male',
        });

        const res = await request(app)
            .post('/auth/register')
            .send({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                dob: '2000-01-01',
                phone: '1234567890',
                gender: 'male',
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body).toHaveProperty('message', 'User Already with same gmail');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                dob: '2000-01-01',
                phone: '1234567890',
                gender: 'male',
            });

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Welcome Back!');
    });

    it('should not login a user with invalid credentials', async () => {
        await request(app)
            .post('/auth/register')
            .send({
                fullName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                dob: '2000-01-01',
                phone: '1234567890',
                gender: 'male',
            });

        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword',
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Invalid Password');
    });
});
