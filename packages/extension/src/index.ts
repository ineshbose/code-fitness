import { commands, ExtensionContext } from 'vscode';
import MainPanel from './panel';

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand(
    'code-fitness.start',
    () => {
      MainPanel.render(context.extensionUri);
    }
  );

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
