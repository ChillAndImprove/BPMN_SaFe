// viewer.js - External script for strict CSP compliance
(function() {
  'use strict';

  const viewer = new BpmnJS({
    container: '#canvas'
  });

  const fileInput = document.getElementById('fileInput');
  const info = document.getElementById('info');
  const errorDiv = document.getElementById('error');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const resetZoomBtn = document.getElementById('resetZoom');
  const exportSVGBtn = document.getElementById('exportSVG');

  function showError(message) {
    errorDiv.textContent = '⚠️ ' + message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  function hideError() {
    errorDiv.style.display = 'none';
  }

  function updateInfo(message, isSuccess = true) {
    info.textContent = message;
    if (isSuccess) {
      info.style.background = '#d4edda';
      info.style.color = '#155724';
    } else {
      info.style.background = '#ecf0f1';
      info.style.color = '#7f8c8d';
    }
  }

  // File loading
  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    hideError();
    updateInfo('Loading ' + file.name + '...', false);

    try {
      const text = await file.text();

      // Validate it's XML/BPMN
      if (!text.includes('<bpmn') && !text.includes('<?xml')) {
        throw new Error('File does not appear to be a valid BPMN/XML file');
      }

      await viewer.importXML(text);

      const canvas = viewer.get('canvas');
      canvas.zoom('fit-viewport');

      const sizeKB = (file.size / 1024).toFixed(1);
      updateInfo('✓ Loaded: ' + file.name + ' (' + sizeKB + ' KB)', true);
    } catch (err) {
      showError('Failed to load BPMN: ' + err.message);
      updateInfo('Load failed', false);
      console.error('Import error:', err);
    }
  });

  // Zoom controls
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      try {
        viewer.get('zoomScroll').stepZoom(1);
      } catch (err) {
        showError('Zoom failed: Load a BPMN file first');
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      try {
        viewer.get('zoomScroll').stepZoom(-1);
      } catch (err) {
        showError('Zoom failed: Load a BPMN file first');
      }
    });
  }

  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
      try {
        viewer.get('canvas').zoom('fit-viewport');
      } catch (err) {
        showError('Reset failed: Load a BPMN file first');
      }
    });
  }

  // Export SVG
  if (exportSVGBtn) {
    exportSVGBtn.addEventListener('click', async () => {
      try {
        const result = await viewer.saveSVG();
        const svg = result.svg;

        // Create download link
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.svg';
        a.click();

        URL.revokeObjectURL(url);
        updateInfo('✓ SVG exported successfully', true);
      } catch (err) {
        showError('Export failed: ' + err.message);
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Plus: Zoom in
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
      e.preventDefault();
      zoomInBtn.click();
    }
    // Ctrl/Cmd + Minus: Zoom out
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
      e.preventDefault();
      zoomOutBtn.click();
    }
    // Ctrl/Cmd + 0: Reset zoom
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      e.preventDefault();
      resetZoomBtn.click();
    }
  });

  // Log privacy status on load
  console.log('🔒 Privacy-Safe BPMN Viewer initialized');
  console.log('✓ All processing happens locally in your browser');
  console.log('✓ No data is sent to any server');
  console.log('✓ Content Security Policy enforced');
})();
