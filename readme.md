
# Context7 MCP & Dashboard

> Context7 is a documentation aggregation and browsing system with an MCP (Model Context Protocol) backend server and a user-friendly web dashboard. This repo contains both the MCP server (`context7/`) and the Dashboard (`context7-dashboard/`).

---

## 🚀 Overview

- **MCP Server (`context7/`)**  
  TypeScript-based backend that manages documentation sources, fetches and parses GitHub repos, and provides APIs to serve aggregated docs.

- **Dashboard (`context7-dashboard/`)**  
  Express.js server with a React (or vanilla) frontend UI allowing non-technical users to add GitHub repos and browse docs visually.

---

## 🗂 Repository Structure

```

context7-mcp/
├── context7/               # MCP server (TypeScript backend)
│   ├── sources.json        # Dynamic list of doc sources
│   ├── src/                # Source code (TS)
│   ├── dist/               # Compiled JS output
│   └── package.json        # MCP server dependencies and scripts
├── context7-dashboard/     # Web dashboard (frontend + Express backend)
│   ├── public/             # Static frontend assets
│   ├── server.js           # Express backend server
│   └── package.json        # Dashboard dependencies
├── start.js                # Root script to launch both servers locally
└── package.json            # (Optional) root scripts and metadata

````

---

## ⚙️ Local Development Setup

### Prerequisites

- Node.js v16+ (recommend latest LTS)
- npm or yarn
- Git

### Clone the repo

```bash
git clone <your-repo-url>
cd context7-mcp
````

---

### Install dependencies

```bash
# MCP backend dependencies
cd context7
npm install

# Dashboard dependencies
cd ../context7-dashboard
npm install

# Back to root (optional)
cd ..
```

---

### Running Locally

#### Option 1: Start MCP and Dashboard separately

Open two terminals:

```bash
# Terminal 1: MCP backend
cd context7
npm run build       # Compile TypeScript (if needed)
npm run start       # Or `node dist/index.js` to start server

# Terminal 2: Dashboard
cd context7-dashboard
node server.js      # Start Express + frontend server
```

#### Option 2: Start both together via root script

```bash
node start.js
```

This script concurrently starts both MCP backend and Dashboard server for easy local dev.

---

## 🔧 Configuration

* **Sources of documentation**: Managed in `context7/sources.json`. Add GitHub repo URLs here with format:

```json
[
  {
    "type": "github",
    "url": "https://github.com/user/repo",
    "docsPath": "/docs"
  }
]
```

* **Dashboard Backend API URLs**: By default, dashboard expects MCP backend at `http://localhost:3000` or adjust the URLs inside the dashboard code (`server.js`) before deployment.

---

## 🧪 Testing the System

1. Run both servers locally.
2. Open your browser at `http://localhost:4000` (default port for dashboard).
3. Use the form to add GitHub repos (must have `/docs` folder).
4. The MCP backend will parse sources and serve structured docs.
5. Explore docs via dashboard UI.

---

## 📦 Deployment

### Dashboard

* Deploy `context7-dashboard/` folder to **Vercel** or any Node.js-compatible hosting.
* Use a `vercel.json`

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

* Connect your GitHub repo on Vercel, select the `context7-dashboard` folder for deployment.

### MCP Backend

* Deploy `context7` folder separately to backend-friendly platforms like Heroku, Render, Railway, or Fly.io.
* Build TypeScript code (`npm run build`), then start server (`node dist/index.js`).
* Configure environment variables and port as needed.

---

## 🔗 Connecting Dashboard & Backend

* Ensure the dashboard’s API calls point to the deployed MCP backend URL (not localhost).
* Update URLs in `context7-dashboard/server.js` or use environment variables for dynamic configuration.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Please fork the repo and submit pull requests.

---

## 📜 License

MIT License — see [LICENSE](./LICENSE) file for details.

---

## 🙋‍♂️ Questions?

Contact the maintainers or open an issue in this repo.

---

### Thanks for using Context7! 🚀



