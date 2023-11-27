import app from '../src/app';
import request from 'supertest';

describe('GET /', () => {
  it('responds with Hello World!', async () => {
    const res = await request(app).get('/');
    expect(res.text).toEqual('Hello World!');
    expect(res.statusCode).toBe(200);
  });
});
