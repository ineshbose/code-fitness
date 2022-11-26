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
				content="default-src 'none'; img-src ${webview.cspSource} https:; script-src ${
    webview.cspSource
  }; style-src ${webview.cspSource};"
			/>
			<script type="module" crossorigin src="${webview.asWebviewUri(
        vscode.Uri.joinPath(
          context.extensionUri,
          'dist',
          'ext',
          'code-fitness.umd.js'
        )
      )}"></script>
			<link rel="stylesheet" href="${webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'dist', 'ext', 'style.css')
      )}">
		</head>
		<body></body>
	</html>
	`;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('code-fitness.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'code-fitness',
        'Extension',
        vscode.ViewColumn.One,
        { enableScripts: true }
      );
      panel.webview.html = getWebviewContent(context, panel.webview);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('code-fitness.reload', () => {
      // panel.kill();
      // panel.createOrShow(context.extensionUri);
      // setTimeout(() => {
      //   vscode.commands.executeCommand(
      //     "workbench.action.webview.openDeveloperTools"
      //   );
      // }, 500);
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
