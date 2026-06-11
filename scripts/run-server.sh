#!/usr/bin/env bash
# Run the built MCP HTTP server so macOS will present permission prompts
cd /Users/nilslin/Dev/mcp-server-apple-events || exit 1
/opt/homebrew/bin/node -e "import('/Users/nilslin/Dev/mcp-server-apple-events/dist/server/server.js').then(m=>m.startHttpServer({name:'mcp-server-apple-events',version:'0.0.0'},3000)).catch(e=>{console.error(e);process.exit(1)})"
