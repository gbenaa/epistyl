## PBI-04 — Upload Endpoint

**Epic:** Backend Foundation
**Feature:** Image Upload and Validation
**Status:** Completed and Tested
**Date:** 2025-10-17
**Owner:** gb

---

### Purpose

Implement and verify an API endpoint to accept image uploads, validate file types, and return the stored file path.
This endpoint serves as the backend foundation for user-initiated style-transfer operations in Epistyl.

---

### Acceptance Criteria

| ID | Given                                         | When                  | Then                                                   | Result |
| -- | --------------------------------------------- | --------------------- | ------------------------------------------------------ | ------ |
| 1  | A valid image file (.png, .jpg, .jpeg, .webp) | POSTed to /api/upload | HTTP 200 with JSON `{ "path": "/uploads/<filename>" }` | Passed |
| 2  | An invalid file type (.txt, .exe, .pdf)       | POSTed to /api/upload | HTTP 400 with JSON `{ "error": "Invalid file type" }`  | Passed |
| 3  | No file attached                              | POSTed to /api/upload | HTTP 400 with JSON `{ "error": "No file uploaded" }`   | Passed |

---

### Implementation Summary

* Framework: Express.js
* Middleware: Multer 1.4.5-lts.2
* Route: `/api/upload`
* Storage: Local `uploads/` directory with randomised filenames
* Response: JSON with stored path
* Validation: MIME-type filtering and file-size limits (10 MB default)
* Static serving: `/uploads` mapped to the upload directory for development use
* Error handling: Graceful 400 responses for invalid input

---

### Testing

* Framework: Jest 29 with Supertest 7
* Environment: Node 22 (ESM mode via `--experimental-vm-modules`)
* Test file: `tests/upload.spec.js`
* Result:

  ```
  PASS  tests/upload.spec.js
   PBI-04 /api/upload
     ✓ Given valid image -> When POSTed -> Then 200 and path returned
     ✓ Given invalid file type -> When POSTed -> Then 400 invalid type
     ✓ Given no file -> When POSTed -> Then 400 no file uploaded
  ```

---

### Notes

* Added `uploads/` to `.gitignore`.
* Multer 2.x upgrade deferred until PBI-09 (security hardening).
* This endpoint now provides a tested interface for the frontend to send images for style-transfer processing.

---

### Commit Message

```
feat(api): implement and test /api/upload endpoint (PBI-04)

- Added multer middleware for secure image uploads
- Implemented /api/upload route with MIME validation
- Added Jest + Supertest tests covering valid, invalid, and empty cases
- All PBI-04 acceptance criteria passed
```
