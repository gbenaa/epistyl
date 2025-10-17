// = Multer setup with type validation
// -> Accepts only whitelisted image mime types and limits file size

import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { UPLOAD_DIR, MAX_FILE_SIZE_BYTES, ALLOWED_MIME_TYPES, EXT_BY_MIME } from '../config.js';

// -> Ensure upload directory exists
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// -> Storage: random filename + correct extension
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = EXT_BY_MIME[file.mimetype] || path.extname(file.originalname) || '';
    const name = crypto.randomBytes(16).toString('hex') + ext.toLowerCase();
    cb(null, name);
  }
});

// -> Filter only allowed mime types
function fileFilter(_req, file, cb) {
  if (ALLOWED_MIME_TYPES.has(file.mimetype)) return cb(null, true);
  const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'file');
  err.message = 'Invalid file type';
  return cb(err);
}

// -> Named export used by routes
export const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE_BYTES, files: 1 }
}).single('file');
