# 🔒 Privacy-Safe BPMN Editor & Viewer

A 100% client-side BPMN editor and viewer that runs entirely in your browser with zero external connections. Perfect for creating and viewing sensitive business processes without any data leaving your machine.

> **Built with Claude Code by Anthropic** - AI-assisted development for privacy-first applications

## ✨ Privacy Features

- ✅ **100% Client-Side**: All processing happens in your browser
- ✅ **No External Requests**: Strict CSP blocks all network connections
- ✅ **Self-Hosted**: No CDNs, no tracking, no analytics
- ✅ **No Data Collection**: Files never leave your device
- ✅ **GitHub Pages Ready**: Can be hosted on GitHub Pages safely
- ✅ **Full BPMN 2.0 Support**: Complete modeling capabilities

## 📋 Available Tools

### ✏️ BPMN Editors (Create & Edit Diagrams)

#### 1. Strict Editor (`editor-strict.html`) ⭐ RECOMMENDED
- Full-featured BPMN modeler
- Ultra-strict CSP (no inline scripts/styles)
- Complete palette and context pad
- Save BPMN files locally
- Export to SVG
- Keyboard shortcuts (Ctrl+S, Ctrl+N, etc.)
- Maximum security posture

#### 2. Basic Editor (`editor-basic.html`)
- Same editing features as strict version
- Single-file setup with inline styles
- Easier to deploy locally
- Good for quick local development

### 👁️ BPMN Viewers (View-Only Mode)

#### 3. Strict Viewer (`viewer-strict.html`)
- Read-only BPMN viewing
- Ultra-strict CSP
- SVG export
- Zoom controls

#### 4. Basic Viewer (`viewer-basic.html`)
- Single-file viewer
- Quick diagram viewing
- Simple interface

## 🚀 Quick Start

The repository is **ready to use** - all dependencies are included!

### Option 1: Open Locally

```bash
# Clone the repository
git clone https://github.com/ChillAndImprove/BPMN_SaFe.git
cd BPMN_SaFe

# Start a local server (required for strict versions)
python3 -m http.server 8000

# Open in browser:
# http://localhost:8000/editor-strict.html
```

### Option 2: Use GitHub Pages

Simply visit: **https://chillandimprove.github.io/BPMN_SaFe/**

Choose your preferred tool from the landing page.

## 🎯 Usage

### Creating a New Diagram

1. Open `editor-strict.html` or `editor-basic.html`
2. Use the palette on the left to drag elements
3. Click elements for the context pad
4. Click **"Save BPMN"** to download your work

### Editing an Existing Diagram

1. Click **"Open BPMN"** and select your `.bpmn` file
2. Edit as needed
3. Save when done

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save BPMN file
- `Ctrl/Cmd + N` - New diagram
- `Ctrl/Cmd + +` - Zoom in
- `Ctrl/Cmd + -` - Zoom out
- `Ctrl/Cmd + 0` - Fit to viewport

## 📦 File Structure

```
BPMN_SaFe/
├── index.html                  # Landing page
├── editor-strict.html          # Editor with strict CSP
├── editor-basic.html           # Editor with inline styles
├── viewer-strict.html          # Viewer with strict CSP
├── viewer-basic.html           # Viewer with inline styles
├── lib/
│   ├── bpmn-modeler.production.min.js  # Editor library (536 KB)
│   ├── bpmn-viewer.production.min.js   # Viewer library (180 KB)
│   ├── bpmn-js.css            # BPMN styles
│   ├── diagram-js.css         # Diagram styles
│   ├── bpmn-font.css          # Icon fonts
│   └── font/                  # Font files
├── scripts/
│   ├── editor.js              # Editor logic (external)
│   └── viewer.js              # Viewer logic (external)
├── styles/
│   ├── editor.css             # Editor UI styles
│   └── viewer.css             # Viewer UI styles
└── README.md                  # This file
```

## 🔐 Content Security Policy Explained

### Basic Versions CSP:
```
default-src 'none';           → Block everything by default
script-src 'self';            → Only scripts from same origin
style-src 'self' 'unsafe-inline'; → CSS from same origin + inline
img-src 'self' data: blob:;   → Images from same origin + data URIs
font-src 'self';              → Fonts from same origin
connect-src 'none';           → No network requests allowed
```

### Strict Versions CSP (Maximum Security):
```
default-src 'none';
script-src 'self';            → No inline scripts allowed
style-src 'self';             → No inline styles allowed
img-src 'self' data: blob:;
font-src 'self';
connect-src 'none';
frame-ancestors 'none';       → Cannot be embedded in frames
base-uri 'self';              → Prevent base tag hijacking
form-action 'none';           → No form submissions
```

## 🧪 Verify Privacy

Open browser DevTools (F12) and check:

1. **Network Tab**: Should show ZERO external requests (only local files)
2. **Console**: Look for CSP violation warnings (there should be none)
3. **Application/Storage**: No cookies, no localStorage used for tracking

## 🌐 Deploy to GitHub Pages

### Automatic (Already Done for This Repo!)

This repo is already configured and live at:
**https://chillandimprove.github.io/BPMN_SaFe/**

### For Your Own Deployment

1. Fork this repository
2. Go to Settings → Pages
3. Source: Deploy from branch `main` / root
4. Save and wait for deployment
5. Access at: `https://YOUR_USERNAME.github.io/BPMN_SaFe/`

## 🆚 Editor vs Viewer Comparison

| Feature | Editor | Viewer |
|---------|--------|--------|
| Create diagrams | ✅ | ❌ |
| Edit diagrams | ✅ | ❌ |
| View diagrams | ✅ | ✅ |
| Save BPMN | ✅ | ❌ |
| Export SVG | ✅ | ✅ |
| Palette/Tools | ✅ | ❌ |
| Context pad | ✅ | ❌ |
| File size | 536 KB | 180 KB |

## 🆚 Basic vs Strict Comparison

| Feature | Basic | Strict |
|---------|-------|--------|
| Inline styles | ✅ | ❌ |
| Inline scripts | ❌ | ❌ |
| Works from file:// | ✅ | ❌ |
| Needs HTTP server | Optional | Required |
| CSP strictness | High | Maximum |
| GitHub Pages | ✅ | ✅ |
| Production ready | ✅ | ✅✅ |

## 🛠️ Development Setup

If you want to modify or customize:

```bash
# Clone the repo
git clone https://github.com/ChillAndImprove/BPMN_SaFe.git
cd BPMN_SaFe

# All dependencies are already included!
# Just start editing the HTML/CSS/JS files

# Test locally
python3 -m http.server 8000
```

## 📝 Sample BPMN Files

You can get sample BPMN files from:
- [bpmn.io demo](https://demo.bpmn.io) - Use "File → Download"
- Create your own with Camunda Modeler
- Export from business process tools like Signavio, Lucidchart, etc.

## 🤝 Contributing

Contributions welcome! This project prioritizes:
- Privacy and security
- Zero external dependencies (at runtime)
- Simplicity and transparency

## 📄 License

This project is provided as-is. The bpmn-js library is licensed under bpmn.io license.

## 🔧 Troubleshooting

### "BpmnJS is not defined"
- Ensure `lib/` directory contains all required files
- Check browser console for 404 errors
- Verify you're using an HTTP server for strict versions

### CSP Violations in Strict Versions
- Must be served via HTTP/HTTPS (not `file://`)
- Use Python, Node, or other local server

### Blank Page on GitHub Pages
- Wait 2-3 minutes for GitHub to build
- Check that all paths are relative
- Verify `lib/` directory was pushed

### Editor Features Not Working
- Make sure you're using the editor, not viewer version
- Check browser console for JavaScript errors
- Try refreshing the page

## 🙏 Credits

- **Built with**: Claude Code by Anthropic
- **BPMN Library**: [bpmn-js](https://bpmn.io/toolkit/bpmn-js/) by Camunda
- **Developed for**: Privacy-conscious professionals and organizations

---

**Privacy First** 🔒 **Client-Side Only** 💻 **No Tracking Ever** 🚫

*Made with Claude Code - AI-assisted development that respects your privacy*
