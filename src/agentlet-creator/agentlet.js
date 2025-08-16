import { Agentlet } from './agentlet.js';

class AgentletBuilder extends Agentlet {
  static get agentletId() {
    return {
      manifestVersion: "1.1.0-mini",
      name: "Agentlet Creator",
      version: "0.1.0",
      groupId: "io.ggobuk",
      artifactId: "creator",
      tagName: "agentlet-creator"
    };
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: white;
          padding: 16px;
          font-family: sans-serif;
        }
        .canvas {
          border: 2px dashed #ccc;
          min-height: 200px;
          padding: 10px;
          background: #f9f9f9;
        }
        .editor-tabs {
          display: flex;
          gap: 12px;
        }
        .editor-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        textarea {
          height: 200px;
          font-family: monospace;
          font-size: 14px;
          width: 100%;
        }
        button {
          margin-top: 6px;
          align-self: flex-start;
        }
      </style>
      <div class="container">
        <div id="canvasArea" class="canvas">🔲 Aquí se mostrará el Agentlet renderizado</div>
        <div class="editor-tabs">
          <div class="editor-tab">
            <label for="jsEditor">agentlet.js</label>
            <textarea id="jsEditor">// Código JS</textarea>
            <button id="renderJS">Render</button>
          </div>
          <div class="editor-tab">
            <label for="manifestEditor">manifest.json</label>
            <textarea id="manifestEditor">{\n  \n}</textarea>
          </div>
        </div>
      </div>
    `;

    const renderBtn = this.shadowRoot.querySelector('#renderJS');
    const jsEditor = this.shadowRoot.querySelector('#jsEditor');
    const canvasArea = this.shadowRoot.querySelector('#canvasArea');

    renderBtn.addEventListener('click', () => {
      try {
        eval(jsEditor.value);
        canvasArea.innerHTML = '<div id="generatedOutput">Resultado actualizado</div>';
      } catch (e) {
        canvasArea.innerHTML = `<div style="color: red;">Error: ${e.message}</div>`;
      }
    });
  }
}

Agentlet.register(AgentletBuilder);
