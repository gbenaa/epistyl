// = Config loader
// -> Centralises environment config and sane defaults

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const UPLOAD_DIR = process.env.UPLOAD_DIR
  || path.resolve(__dirname, '../../uploads');

export const MAX_FILE_SIZE_BYTES = Number(process.env.MAX_FILE_SIZE_BYTES || 10 * 1024 * 1024); // 10 MB

// -> Whitelist common image mime types
export const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif' // optional, remove if not wanted
]);

// -> File extension mapping is helpful if you ever need to normalise
export const EXT_BY_MIME = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif'
};
