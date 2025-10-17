// = /api/upload route
// -> Accepts multipart/form-data with a single image under "file"

import { Router } from 'express';
import path from 'path';
import { uploadSingleImage } from '../middleware/upload.js';
import { UPLOAD_DIR } from '../config.js';

const router = Router();

router.post('/upload', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    // -> Handle Multer errors first
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Invalid file type' });
      }
      return res.status(400).json({ error: 'Upload failed' });
    }

    // -> No file provided case
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // -> Normalise a public path to return
    // -> If you serve the uploads dir statically under /uploads, return that path
    const filename = req.file.filename;
    const returnedPath = `/uploads/${filename}`;

    return res.status(200).json({ path: returnedPath });
  });
});

export default router;
