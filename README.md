# 🔒 Privacy-Safe BPMN Viewer

A 100% client-side BPMN viewer that runs entirely in your browser with zero external connections. Perfect for viewing sensitive business processes without any data leaving your machine.

## ✨ Privacy Features

- ✅ **100% Client-Side**: All processing happens in your browser
- ✅ **No External Requests**: Strict CSP blocks all network connections
- ✅ **Self-Hosted**: No CDNs, no tracking, no analytics
- ✅ **No Data Collection**: Files never leave your device
- ✅ **GitHub Pages Ready**: Can be hosted on GitHub Pages safely

## 📋 Two Versions Available

### 1. Basic Viewer (`viewer-basic.html`)
- Single-file setup with inline styles
- Easier to get started
- CSP allows inline styles for convenience
- Good for quick local use

### 2. Strict Viewer (`viewer-strict.html`)
- Ultra-strict CSP (no inline scripts/styles)
- External CSS and JS files
- Maximum security posture
- Better for production/GitHub Pages

## 🚀 Setup Instructions

### Step 1: Download bpmn-js

You need to download the bpmn-js library and host it locally:

```bash
# Create lib directory
mkdir -p lib

# Download bpmn-js (choose one method):

# Option A: Using npm
npm install bpmn-js
cp node_modules/bpmn-js/dist/bpmn-viewer.production.min.js lib/

# Option B: Direct download
curl -L https://unpkg.com/bpmn-js@17.12.0/dist/bpmn-viewer.production.min.js -o lib/bpmn-viewer.production.min.js
```

### Step 2: Verify File Structure

Your directory should look like this:

```
bpmn/
├── lib/
│   └── bpmn-viewer.production.min.js
├── styles/
│   └── viewer.css
├── scripts/
│   └── viewer.js
├── viewer-basic.html
├── viewer-strict.html
└── README.md
```

### Step 3: Open and Use

**For Basic Viewer:**
```bash
# Just open in browser
firefox viewer-basic.html
# or
chrome viewer-basic.html
```

**For Strict Viewer:**
```bash
# Must be served via HTTP (not file://)
python3 -m http.server 8000
# Then open: http://localhost:8000/viewer-strict.html
```

## 🌐 Deploy to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Push all files to your repo
2. Go to Settings → Pages
3. Select branch (usually `main`) and root folder
4. Save and wait for deployment
5. Access at: `https://yourusername.github.io/bpmn/viewer-strict.html`

### Method 2: Using Git Command Line

```bash
# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Add privacy-safe BPMN viewer"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/bpmn.git

# Push
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings.

## 🎯 Usage

1. Click "Load BPMN File"
2. Select a `.bpmn` or `.xml` file from your computer
3. Use zoom controls or keyboard shortcuts:
   - `Ctrl/Cmd + +`: Zoom in
   - `Ctrl/Cmd + -`: Zoom out
   - `Ctrl/Cmd + 0`: Reset view
4. (Strict viewer only) Export diagram as SVG

## 🔐 Content Security Policy Explained

### Basic Viewer CSP:
```
default-src 'none';           → Block everything by default
script-src 'self';            → Only scripts from same origin
style-src 'self' 'unsafe-inline'; → CSS from same origin + inline
img-src 'self' data:;         → Images from same origin + data URIs
font-src 'self';              → Fonts from same origin
connect-src 'none';           → No network requests allowed
```

### Strict Viewer CSP (Even More Locked Down):
```
default-src 'none';
script-src 'self';            → No inline scripts allowed
style-src 'self';             → No inline styles allowed
img-src 'self' data:;
font-src 'self';
connect-src 'none';
frame-ancestors 'none';       → Cannot be embedded in frames
base-uri 'self';              → Prevent base tag hijacking
form-action 'none';           → No form submissions
```

## 🧪 Verify Privacy

Open browser DevTools (F12) and check:

1. **Network Tab**: Should show ZERO external requests
2. **Console**: Look for CSP violation warnings (there should be none)
3. **Application/Storage**: No cookies, no localStorage used

## 📦 File Size Reference

- `bpmn-viewer.production.min.js`: ~500 KB
- All other files: < 10 KB total

Total size: ~510 KB (works offline once loaded)

## 🛠️ Troubleshooting

### "BpmnJS is not defined"
- Make sure `lib/bpmn-viewer.production.min.js` exists
- Check browser console for 404 errors

### CSP Violations in Strict Viewer
- Must be served via HTTP server (not `file://`)
- Use Python/Node/other local server

### File Won't Load
- Verify file is valid BPMN XML format
- Check browser console for specific errors
- Try with a sample BPMN file from bpmn.io

### Blank Page on GitHub Pages
- Wait a few minutes for GitHub Pages to build
- Check that all paths are relative (no `/` prefix)
- Verify `lib/` directory was pushed to repo

## 🆚 Comparison

| Feature | Basic | Strict |
|---------|-------|--------|
| Inline styles | ✅ | ❌ |
| Inline scripts | ❌ | ❌ |
| Works from file:// | ✅ | ❌ |
| Needs HTTP server | Optional | Required |
| CSP strictness | High | Maximum |
| GitHub Pages | ✅ | ✅ |

## 📝 Sample BPMN Files

You can get sample BPMN files from:
- [bpmn.io](https://demo.bpmn.io) - Use "File → Download"
- Create your own with modeling tools like Camunda Modeler
- Export from business process tools

## 🤝 Contributing

This viewer is intentionally minimal. No external dependencies beyond bpmn-js.

## 📄 License

The viewer code is provided as-is. The bpmn-js library has its own license (MIT).

---

**Privacy First** 🔒 **Client-Side Only** 💻 **No Tracking Ever** 🚫
