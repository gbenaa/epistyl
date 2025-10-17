// = App entrypoint
// -> Exports app for tests. Only listens when not in test.

import express from 'express';
import path from 'path';
import uploadRouter from './src/routes/upload.js';
import { UPLOAD_DIR } from './src/config.js';

const app = express();

// -> Healthcheck
app.get('/health', (_req, res) => res.json({ ok: true }));

// -> Static serving for uploaded files (optional, useful during dev)
app.use('/uploads', express.static(UPLOAD_DIR));

// -> Routes
app.use('/api', uploadRouter);

// -> Error fallback
app.use((err, _req, res, _next) => {
  return res.status(500).json({ error: 'Internal server error' });
});

export default app;

// -> Start server only if run directly
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Epistyl backend listening on :${PORT}`);
  });
}
