import type { WebviewApi } from 'vscode-webview';

class VSCodeAPIWrapper {
  private readonly vsCodeApi: WebviewApi<unknown> | undefined;

  constructor() {
    if (typeof acquireVsCodeApi === 'function') {
      this.vsCodeApi = acquireVsCodeApi();
    }
  }
}

export default new VSCodeAPIWrapper();
