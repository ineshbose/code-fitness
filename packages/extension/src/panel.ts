/* eslint-disable no-underscore-dangle */
import {
  Disposable,
  Webview,
  WebviewPanel,
  window,
  Uri,
  ViewColumn,
} from 'vscode';

export default class MainPanel {
  // eslint-disable-next-line no-use-before-define
  public static currentPanel: MainPanel | undefined;

  private readonly _panel: WebviewPanel;

  private _disposables: Disposable[] = [];

  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri
    );

    this._setWebviewMessageListener(this._panel.webview);
  }

  public static render(extensionUri: Uri) {
    if (MainPanel.currentPanel) {
      MainPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel(
        'showMain',
        'Hello World',
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

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          Hello world!
        </body>
      </html>
    `;
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
