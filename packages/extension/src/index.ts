import { commands, ExtensionContext } from 'vscode';
import { ofetch } from 'ofetch';
import MainPanel from './panel';

let identifier = '';

export function activate(context: ExtensionContext) {
  identifier = context.extensionUri.toString();
  ofetch('https://code-fitness.vercel.app/', {
    method: 'POST',
    body: { identifier, timestamp: new Date().toISOString(), action: 'open' },
  });

  const showHelloWorldCommand = commands.registerCommand(
    'code-fitness.start',
    () => {
      MainPanel.render(context.extensionUri);
    }
  );

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
}

export function deactivate() {
  ofetch('https://code-fitness.vercel.app/', {
    method: 'POST',
    body: { identifier, timestamp: new Date().toISOString(), action: 'close' },
  });
}
