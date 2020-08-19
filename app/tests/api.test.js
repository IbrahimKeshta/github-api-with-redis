import dotenv from 'dotenv';
dotenv.config()
import app from '../../app';
import supertest from 'supertest';
const request = supertest(app)

describe("test github api", () => {
    it('should return users from', async (done) => {
        const data = await request
            .post('/api/search')
            .send({type: "users", text: "Ibrahim Keshta"});
            expect(data.status).toBe(200);
            done();
    });
    it('should return repos from', async (done) => {
        const data = await request
            .post('/api/search')
            .send({type: "repos", text: "express"});
            expect(data.status).toBe(200);
            done();
    });
    it('should return issues from', async (done) => {
        const data = await request
            .post('/api/search')
            .send({type: "users", text: "express"});
            expect(data.status).toBe(200);
            done();
    });
    it('should return error type validation', async (done) => {
        const data = await request
            .post('/api/search')
            .send({type: "pull requests", text: "Ibrahim Keshta"});
            expect(data.status).toBe(400);
            expect(data.body.message).toBe("\"type\" must be one of [users, repos, issues]");
            done();
    })
    it('should return error text minimum three characters validation', async (done) => {
        const data = await request
            .post('/api/search')
            .send({type: "users", text: "Ib"});
            expect(data.status).toBe(400);
            expect(data.body.message).toBe("\"text\" length must be at least 3 characters long");
            done();
    })
    it('should fail', async (done) => {
        const data = await request
            .post('/api/search')
            .send({type: "users", text: "Ib"});
            expect(data.status).toBe(401);
            done();
    })
})