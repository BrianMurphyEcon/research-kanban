# Research Project Manager - Local Setup Guide

## Prerequisites

Before you start, make sure you have the following installed on your PC:

- **Node.js** (v18 or higher): Download from [nodejs.org](https://nodejs.org/)
- **pnpm** (package manager): After installing Node.js, run:
  ```bash
  npm install -g pnpm
  ```

## Installation & Running Locally

1. **Extract the project archive**
   - Unzip `research-kanban-clean.tar.gz` to a folder on your PC
   - Navigate to the `research-kanban` folder in your terminal

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   This will download and install all required packages (takes 1-2 minutes).

3. **Start the development server**
   ```bash
   pnpm dev
   ```
   You should see output like:
   ```
   ➜  Local:   http://localhost:5173/
   ```

4. **Open in your browser**
   - Click the link or manually go to `http://localhost:5173/`
   - Your Research Project Manager is now running!

## How to Use

- **Add Projects**: Click "Add Task" in any column to create a new research project
- **Edit Projects**: Click on any card to open the editor and add descriptions, tags, and replication package links
- **Drag & Drop**: Drag cards between columns to move projects through stages
- **Completed Column**: Hover over the collapsed "Completed" section on the right to expand it and view archived projects
- **Auto-Save**: All your data is automatically saved to your browser's local storage

## Building for Production

To create an optimized build for deployment:

```bash
pnpm build
```

This generates a `dist` folder with production-ready files.

## Troubleshooting

**Port 5173 already in use?**
```bash
pnpm dev -- --port 3000
```

**Dependencies not installing?**
```bash
pnpm install --force
```

**Need to reset everything?**
- Clear your browser's local storage (DevTools → Application → Local Storage → Clear All)
- Delete `node_modules` folder and run `pnpm install` again

## Support

For issues or questions, check the project structure:
- `client/src/pages/Home.tsx` - Main page
- `client/src/components/KanbanBoard.tsx` - Board logic
- `client/src/index.css` - Styling and theme

Enjoy managing your research pipeline! 📚
