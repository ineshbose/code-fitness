/* eslint-disable no-underscore-dangle */
import {
  Disposable,
  Webview,
  WebviewPanel,
  window,
  Uri,
  ViewColumn,
  extensions,
} from 'vscode';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { webview as appWebview } from 'app';
import type { GitExtension, API as GitAPI } from '../types/git.vendored';

export default class MainPanel {
  // eslint-disable-next-line no-use-before-define
  public static currentPanel: MainPanel | undefined;

  private readonly _panel: WebviewPanel;

  private _disposables: Disposable[] = [];

  private _nonce!: string;

  private gitExtension: GitAPI | undefined;

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this.gitExtension = extensions
      .getExtension<GitExtension>('vscode.git')
      ?.exports.getAPI(1);

    if (!this.gitExtension) {
      throw new Error('Git Extension not enabled!');
    }

    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri
    );

    this._setWebviewMessageListener(this._panel.webview);
    this._generateNonce();
  }

  private _generateNonce() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this._nonce = text;
  }

  public static render(extensionUri: Uri) {
    if (MainPanel.currentPanel) {
      MainPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel(
        'showMain',
        'Code Fitness',
        ViewColumn.One,
        { enableScripts: true }
      );

      MainPanel.currentPanel = new MainPanel(panel, extensionUri);
    }
  }

  public dispose() {
    MainPanel.currentPanel = undefined;
    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    const content = appWebview(webview, extensionUri, 'dist')
      .replace(
        '<body ',
        `<body data-repositories="${this.gitExtension?.repositories
          .map((r) => r.rootUri)
          .join()}" `
      )
      .replaceAll('<script ', `<script nonce="${this._nonce}" `);

    return content;
  }

  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (message: any) => {
        const { command } = message;
        const { text } = message;

        switch (command) {
          case 'hello':
            window.showInformationMessage(text);
            break;

          default:
            break;
        }
      },
      undefined,
      this._disposables
    );
  }
}
