const { spawn } = require('child_process');
const { execSync } = require('child_process');

console.log('Checking TypeScript version:');
try {
    execSync('npx tsc --version', { stdio: 'inherit' });
} catch (e) {
    console.error('TypeScript not found');
}

console.log('Starting MCP server...');
const mcp = spawn('npm', ['run', 'prod'], { cwd: './context7', stdio: 'inherit', shell: true });

console.log('Starting Dashboard server...');
const dashboard = spawn('node', ['server.js'], { cwd: './context7-dashboard', stdio: 'inherit', shell: true });

mcp.on('close', (code) => {
    console.log(`MCP server exited with code ${code}`);
    process.exit(code);
});

dashboard.on('close', (code) => {
    console.log(`Dashboard server exited with code ${code}`);
    process.exit(code);
});