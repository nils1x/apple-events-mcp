# MCP Server — Apple Events (EventKit)

Lightweight MCP (ModelContextProtocol) server that exposes macOS EventKit access (Reminders & Calendar) to MCP clients. Designed to run on the same macOS machine that owns the Reminders/Calendar data; can be run interactively or as a daemon behind a tunnel.

Why this repo
- Provides tools and prompts that let MCP clients read and write Reminders and Calendar events via the system EventKit APIs.
- Small, audit-friendly code surface intended for local or single-host deployment.

Features
- MCP server implementation with HTTP transport and a tiny JSON-RPC-compatible endpoint surface.
- Health endpoint: GET /health (returns JSON). No auth required.
- Optional shared-secret gate (MCP_SHARED_SECRET) for simple access control.
- Optional daemon mode for background access to EventKit (EVENTKIT_DAEMON=1).

Quick Start

Prerequisites
- Node.js 18+ (or compatible runtime able to import ES modules)
- A package manager (pnpm / npm / yarn) if you want to build from source

Run from a built distribution (dist)
1. Clone the repository:

   git clone <repo-url>

2. Start the HTTP server using Node's dynamic import (example uses port 3000):

   node -e "import('./dist/server/server.js').then(m=>m.startHttpServer({name:'mcp-server-apple-events',version:'0.0.0'},3000))"

3. Check health:

   curl http://127.0.0.1:3000/health

If you prefer to build from source
- If package scripts exist: run your package-manager install/build steps (for example `pnpm install && pnpm build`). Then run the server from dist as above.

Configuration
- MCP_SHARED_SECRET (optional): when set, the server expects incoming requests to include header `x-mcp-secret` with this value.
- EVENTKIT_DAEMON=1 (optional): enables the EventKit daemon integration for background operations.

Security & Publishing Notes
- Do NOT commit secrets. This repository includes templates and code paths that read secrets from environment variables. Always set secrets via environment or your CI/CD secret store.
- Before publishing or making the repository public run a full history scan for secrets (gitleaks or trufflehog) and/or rewrite history to remove any sensitive data. See the "Security Checklist" below.

Security Checklist (recommended before making public)
1. Ensure .gitignore excludes node_modules, build artifacts, and env files (this repo includes a .gitignore).
2. Run a history scan locally: `brew install gitleaks && gitleaks detect --source .` or `pip3 install trufflehog && trufflehog git file://$(pwd)`.
3. If sensitive data appears in history, remove it with `git filter-repo` or create a new orphan root commit and garbage-collect unreferenced objects.
4. Replace any deployment plists or templates that contain placeholder values with templates that do not contain real secrets. Keep secrets out of the repository and use CI/host secret storage (GitHub Secrets, etc.).

Development
- Tests and linting: run the standard scripts from the repository if present (for example `pnpm lint && pnpm test`). Note: some repositories may not include a package.json in the root — follow the repo-specific setup if present.

Contributing
- Open an issue to discuss proposed changes or file a PR.
- Keep changes small, document public surface changes, and avoid committing credentials or private data.

Support
- Open an issue in this repository for bugs, feature requests, or help with deployment.

License
- This project is provided under the MIT license (or your chosen license). Add LICENSE file if missing.

Acknowledgements
- Built to serve MCP clients that need macOS native calendar and reminders access via a small, auditable server.
