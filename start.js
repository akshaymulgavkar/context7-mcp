const { spawn } = require('child_process');

// Adjust these paths as per your repo structure
const mcp = spawn('npm', ['run', 'dev'], { cwd: './context7', stdio: 'inherit' });
const dashboard = spawn('node', ['server.js'], { cwd: './context7-dashboard', stdio: 'inherit' });

mcp.on('close', code => {
    console.log(`MCP server exited with code ${code}`);
    process.exit(code);
});

dashboard.on('close', code => {
    console.log(`Dashboard server exited with code ${code}`);
    process.exit(code);
});