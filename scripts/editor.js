// editor.js - External script for strict CSP compliance
(function() {
  'use strict';

  const modeler = new BpmnJS({
    container: '#canvas',
    keyboard: {
      bindTo: document
    }
  });

  const fileInput = document.getElementById('fileInput');
  const info = document.getElementById('info');
  const errorDiv = document.getElementById('error');
  const successDiv = document.getElementById('success');

  // Default empty BPMN diagram
  const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  targetNamespace="http://bpmn.io/schema/bpmn"
                  id="Definitions_1">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="173" y="102" width="36" height="36"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

  function showError(message) {
    errorDiv.textContent = '⚠️ ' + message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  function showSuccess(message) {
    successDiv.textContent = '✓ ' + message;
    successDiv.style.display = 'block';
    setTimeout(() => {
      successDiv.style.display = 'none';
    }, 3000);
  }

  function hideMessages() {
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
  }

  function updateInfo(message, isSuccess) {
    info.textContent = message;
    if (isSuccess === true) {
      info.style.background = '#d4edda';
      info.style.color = '#155724';
    } else if (isSuccess === false) {
      info.style.background = '#f8d7da';
      info.style.color = '#721c24';
    } else {
      info.style.background = '#ecf0f1';
      info.style.color = '#7f8c8d';
    }
  }

  async function openDiagram(xml, filename) {
    try {
      await modeler.importXML(xml);
      const canvas = modeler.get('canvas');
      canvas.zoom('fit-viewport');
      updateInfo('✓ Loaded: ' + filename, true);
    } catch (err) {
      showError('Failed to load BPMN: ' + err.message);
      updateInfo('Load failed', false);
      console.error('Import error:', err);
    }
  }

  // Load empty diagram on start
  openDiagram(emptyBpmn, 'new diagram');

  // File loading
  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    hideMessages();
    updateInfo('Loading ' + file.name + '...', null);

    try {
      const text = await file.text();
      await openDiagram(text, file.name);
    } catch (err) {
      showError('Failed to read file: ' + err.message);
      updateInfo('Failed to read file', false);
    }
  });

  // New diagram
  const newDiagramBtn = document.getElementById('newDiagram');
  if (newDiagramBtn) {
    newDiagramBtn.addEventListener('click', () => {
      if (confirm('Create a new diagram? Unsaved changes will be lost.')) {
        openDiagram(emptyBpmn, 'new diagram');
      }
    });
  }

  // Save BPMN
  const saveBPMNBtn = document.getElementById('saveBPMN');
  if (saveBPMNBtn) {
    saveBPMNBtn.addEventListener('click', async () => {
      try {
        const result = await modeler.saveXML({ format: true });
        const xml = result.xml;

        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram-' + Date.now() + '.bpmn';
        a.click();
        URL.revokeObjectURL(url);

        showSuccess('BPMN file saved successfully');
      } catch (err) {
        showError('Save failed: ' + err.message);
      }
    });
  }

  // Export SVG
  const saveSVGBtn = document.getElementById('saveSVG');
  if (saveSVGBtn) {
    saveSVGBtn.addEventListener('click', async () => {
      try {
        const result = await modeler.saveSVG();
        const svg = result.svg;

        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram-' + Date.now() + '.svg';
        a.click();
        URL.revokeObjectURL(url);

        showSuccess('SVG exported successfully');
      } catch (err) {
        showError('Export failed: ' + err.message);
      }
    });
  }

  // Zoom controls
  const zoomInBtn = document.getElementById('zoomIn');
  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      try {
        modeler.get('zoomScroll').stepZoom(1);
      } catch (err) {
        showError('Zoom failed: Load a diagram first');
      }
    });
  }

  const zoomOutBtn = document.getElementById('zoomOut');
  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      try {
        modeler.get('zoomScroll').stepZoom(-1);
      } catch (err) {
        showError('Zoom failed: Load a diagram first');
      }
    });
  }

  const resetZoomBtn = document.getElementById('resetZoom');
  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
      try {
        modeler.get('canvas').zoom('fit-viewport');
      } catch (err) {
        showError('Reset failed: Load a diagram first');
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S: Save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (saveBPMNBtn) saveBPMNBtn.click();
    }
    // Ctrl/Cmd + N: New diagram
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      if (newDiagramBtn) newDiagramBtn.click();
    }
    // Ctrl/Cmd + Plus: Zoom in
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
      e.preventDefault();
      if (zoomInBtn) zoomInBtn.click();
    }
    // Ctrl/Cmd + Minus: Zoom out
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
      e.preventDefault();
      if (zoomOutBtn) zoomOutBtn.click();
    }
    // Ctrl/Cmd + 0: Reset zoom
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      e.preventDefault();
      if (resetZoomBtn) resetZoomBtn.click();
    }
  });

  // Log privacy status on load
  console.log('🔒 Privacy-Safe BPMN Editor initialized');
  console.log('✓ All editing happens locally in your browser');
  console.log('✓ No data is sent to any server');
  console.log('✓ Content Security Policy enforced');
  console.log('');
  console.log('Keyboard shortcuts:');
  console.log('  Ctrl/Cmd + S: Save BPMN');
  console.log('  Ctrl/Cmd + N: New diagram');
  console.log('  Ctrl/Cmd + +/-: Zoom in/out');
  console.log('  Ctrl/Cmd + 0: Fit to viewport');
})();
