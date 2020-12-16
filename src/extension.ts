// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import emojis from "./emojis";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "emojy" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("emojy.selectEmoji", () => {
    console.log(emojis);
    const quickPick = vscode.window.createQuickPick();
    console.log(emojis);
    quickPick.items = emojis.map((x: any) => ({
      label: x.description,
      description: x.emoji,
    }));
    quickPick.onDidChangeSelection(([item]) => {
      if (item) {
        console.log(item);
        vscode.window.showInformationMessage(
          "Copied to clipboard! => " + item.description
        );
        vscode.env.clipboard.writeText(item.description!);
        quickPick.dispose();
      }
    });
    quickPick.onDidHide(() => quickPick.dispose());
    quickPick.show();
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
