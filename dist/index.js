#!/usr/bin/env node
/**
 * index.ts
 * Entry point for the Apple Reminders MCP server
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { startHttpServer, startServer } from './server/server.js';
import { findProjectRoot } from './utils/projectUtils.js';
// Find project root and load package.json
const projectRoot = findProjectRoot();
let packageJson;
try {
    packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf-8'));
}
catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse package.json: ${detail}`);
}
// Server configuration
const SERVER_CONFIG = {
    name: packageJson.name,
    version: packageJson.version,
};
// Start the application
const httpPort = process.env.MCP_HTTP_PORT
    ? parseInt(process.env.MCP_HTTP_PORT, 10)
    : null;
if (httpPort && !Number.isNaN(httpPort)) {
    startHttpServer(SERVER_CONFIG, httpPort).catch(() => {
        process.exit(1);
    });
}
else {
    startServer(SERVER_CONFIG).catch(() => {
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map