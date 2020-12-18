import * as vscode from "vscode";
import emojis from "./emojis";

export function activate(context: vscode.ExtensionContext) {
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

export function deactivate() {}
