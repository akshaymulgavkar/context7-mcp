const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch'); // npm i node-fetch@2

const app = express();
const PORT = 4000;
const SOURCES_FILE = path.join(__dirname, '../context7/sources.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Load existing sources
function loadSources() {
    if (!fs.existsSync(SOURCES_FILE)) return [];
    const content = fs.readFileSync(SOURCES_FILE);
    return JSON.parse(content);
}

// Save new sources
function saveSources(sources) {
    fs.writeFileSync(SOURCES_FILE, JSON.stringify(sources, null, 2));
}

// API: Get sources
app.get('/api/sources', (req, res) => {
    const sources = loadSources();
    res.json(sources);
});

// API: Add new GitHub source with /docs folder check
app.post('/api/add-source', async(req, res) => {
    const { url } = req.body;
    if (!url || !url.includes('github.com')) {
        return res.status(400).json({ error: 'Invalid GitHub URL' });
    }

    const sources = loadSources();

    if (sources.find(s => s.url === url)) {
        return res.status(409).json({ message: 'Source already exists' });
    }

    // Parse owner and repo from URL
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        return res.status(400).json({ error: 'Invalid GitHub repo URL format' });
    }

    const owner = match[1];
    const repo = match[2];

    try {
        // Check if /docs folder exists in the repo root
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/docs`;

        const response = await fetch(apiUrl, {
            headers: { 'User-Agent': 'context7-dashboard' }
        });

        let docsPath = undefined;
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                // docs is a folder
                docsPath = '/docs';
            }
        }

        const newSource = { type: 'github', url };
        if (docsPath) newSource.docsPath = docsPath;

        sources.push(newSource);
        saveSources(sources);

        res.json({
            message: `GitHub repo added successfully!${docsPath ? ' Docs folder detected.' : ' No docs folder found.'}`
        });
    } catch (err) {
        console.error('Error checking GitHub repo:', err);
        res.status(500).json({ error: 'Failed to validate GitHub repo docs path' });
    }
});

app.listen(PORT, () => {
    console.log(`🌐 Dashboard running at http://localhost:${PORT}`);
});