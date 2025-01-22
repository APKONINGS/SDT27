const request = require('supertest');
const app = require('./server'); 
const { expect } = require('chai');

describe('API Tests', () => {
    describe('POST /register', () => {
        it('should register a new user', (done) => {
            request(app)
                .post('/register')
                .send({ username: 'testuser', email: 'test@example.com', password: 'testpassword' })
                .expect(201)
                .expect((res) => {
                    expect(res.text).to.equal('User registered successfully');
                })
                .end(done);
        });

        it('should return an error if required fields are missing', (done) => {
            request(app)
                .post('/register')
                .send({ username: 'testuser', email: 'test@example.com' })
                .expect(500)
                .end(done);
        });
    });

    describe('POST /login', () => {
        it('should login a user', (done) => {
            request(app)
                .post('/login')
                .send({ username: 'testuser', password: 'testpassword' })
                .expect(200)
                .end(done);
        });

        it('should return an error if username or password is incorrect', (done) => {
            request(app)
                .post('/login')
                .send({ username: 'testuser', password: 'wrongpassword' })
                .expect(401)
                .end(done);
        });
    });
});
