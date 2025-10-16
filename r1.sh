#!/usr/bin/env bash
# ============================================================================
# Epistyl bootstrap script (for existing repo)
# -> Populates scaffold, writes minimal files, runs npm install, commits + tags
# ============================================================================

set -euo pipefail

# = Configuration
DEFAULT_BRANCH="main"

# = Guardrails
command -v git >/dev/null 2>&1 || { echo "git not found"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm not found"; exit 1; }

# = Verify current directory
if [ ! -d ".git" ]; then
  echo "Error: must run this script from the root of an existing git repository."
  exit 1
fi

# = Create folders
mkdir -p frontend backend config runs docs

# = .gitignore
cat > .gitignore <<'EOF'
node_modules/
.env
.DS_Store
Thumbs.db
dist/
build/
.cache/
.next/
coverage/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
EOF

# = README
cat > README.md <<'EOF'
# Epistyl

Epistyl is a style transfer application focused on practical experimentation and reproducible runs.

## Structure
- frontend -> client UI
- backend  -> API service and orchestration
- config   -> environment and deployment configuration
- runs     -> logs, manifests, and generated artefacts
- docs     -> project documentation

## Quick start
1) git clone <repo-url>
2) cd frontend && npm install
3) cd ../backend && npm install

## Environment
Copy .env.example to .env and fill in values as needed.
EOF

# = .env.example
cat > .env.example <<'EOF'
# -> Copy this file to .env and fill in values
REPLICATE_API_TOKEN=your_token_here
FRONTEND_PORT=3000
BACKEND_PORT=4000
NODE_ENV=development
EOF

# = Minimal frontend package.json
mkdir -p frontend
cat > frontend/package.json <<'EOF'
{
  "name": "epistyl-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "echo \"Define dev script once framework is chosen\"",
    "build": "echo \"Define build script once framework is chosen\"",
    "start": "echo \"Define start script once framework is chosen\""
  }
}
EOF

# = Minimal backend package.json
mkdir -p backend
cat > backend/package.json <<'EOF'
{
  "name": "epistyl-backend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node server.js || echo \"Add server.js when backend is scaffolded\"",
    "start": "node server.js || echo \"Add server.js when backend is scaffolded\""
  }
}
EOF

# = Backend placeholder entry file so npm scripts do not error
cat > backend/server.js <<'EOF'
// = Epistyl backend placeholder
// -> Replace with a real server implementation
console.log("Epistyl backend placeholder. Replace with real server.");
EOF

# = Verify npm install works in both apps
( cd frontend && npm install )
( cd backend && npm install )

# = Commit and tag
git add .
git commit -m "Add Epistyl scaffold: frontend, backend, config, runs, docs, README, and .env.example"
git tag v0.0.1-epistyl-scaffold

echo "-> Epistyl scaffold committed and tagged."
echo "-> You can now push with:"
echo "     git push origin $DEFAULT_BRANCH --tags"
