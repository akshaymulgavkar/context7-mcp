const { spawn } = require('child_process');
const path = require('path');

// Spawn MCP server (adjust filename if your main entry point is different)
const mcpServer = spawn('node', [path.join(__dirname, 'context7', 'server.js')], {
    stdio: 'inherit',
    shell: true,
});

// Spawn Dashboard server
const dashboardServer = spawn('node', [path.join(__dirname, 'dashboard', 'server.js')], {
    stdio: 'inherit',
    shell: true,
});

// If any server closes, exit the main process
mcpServer.on('close', (code) => {
    console.log(`MCP server exited with code ${code}`);
    process.exit(code);
});

dashboardServer.on('close', (code) => {
    console.log(`Dashboard server exited with code ${code}`);
    process.exit(code);
});