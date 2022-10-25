import { window } from 'vscode';

export function activate() {
  window.showInformationMessage('Hello');
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
