import vscode from 'vscode';

function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview
) {
  return `
	<!DOCTYPE html>
	<html lang="en">
		<head>
      <meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta
				http-equiv="Content-Security-Policy"
				content="${[
          "default-src 'none'",
          `img-src ${webview.cspSource}`,
          'https:',
          `script-src ${webview.cspSource}`,
          `style-src ${webview.cspSource}`,
        ].join(';')};"
			/>
      <title>Code Fitness</title>
			<script type="module" crossorigin src="${webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'dist/app/main.js')
      )}"></script>
			<link rel="stylesheet" href="${webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'dist/app/style.css')
      )}">
		</head>
		<body><div id="app"></div></body>
	</html>
	`;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('code-fitness.start', () => {
      vscode.window.showInformationMessage('Hello');
      const panel = vscode.window.createWebviewPanel(
        'code-fitness',
        'Health Dashboard',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      panel.webview.html = getWebviewContent(context, panel.webview);
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}