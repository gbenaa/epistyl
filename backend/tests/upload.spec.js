// = Upload endpoint tests for PBI-04
// -> Uses Supertest to simulate multipart uploads

import request from 'supertest';
import app from '../server.js';

// -> Helper to make an in-memory fake file buffer
function makePngBuffer() {
  // -> Minimal valid PNG signature bytes + some filler
  return Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52
  ]);
}

describe('PBI-04 /api/upload', () => {
  test('Given valid image -> When POSTed -> Then 200 and path returned', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('file', makePngBuffer(), { filename: 'valid.png', contentType: 'image/png' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('path');
    expect(typeof res.body.path).toBe('string');
    expect(res.body.path).toMatch(/^\/uploads\/.+\.(png|jpg|jpeg|webp|gif)$/i);
  });

  test('Given invalid file type -> When POSTed -> Then 400 invalid type', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from('not an image'), { filename: 'bad.txt', contentType: 'text/plain' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.toLowerCase()).toContain('invalid file type');
  });

  test('Given no file -> When POSTed -> Then 400 no file uploaded', async () => {
    const res = await request(app).post('/api/upload');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error.toLowerCase()).toContain('no file');
  });
});
