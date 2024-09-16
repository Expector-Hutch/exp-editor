import { open, save } from "@tauri-apps/plugin-dialog";
import { CodeEditor } from "./CodeEditor";
import { KeyCode,KeyMod } from "monaco-editor";
import hotkeys from 'hotkeys-js';

// 设置环境
self.MonacoEnvironment = {
    getWorkerUrl: function (_moduleId, label) {
        if (label === 'typescript' || label === 'javascript') {
            return 'monaco-editor/esm/vs/language/ts.worker.js';
        }
        return 'monaco-editor/esm/vs/language/editor.worker.js';
    }
};

var maineditor = new CodeEditor(document.getElementsByTagName('main')[0], "");

async function saveFile() {
    try {
        await maineditor.saveFile();
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "NoFileLinked") {
                var filePath = await save();
                if (filePath != null) {
                    maineditor.linkFile(filePath);
                    maineditor.saveFile();
                }
            } else {
                console.error(error);
            }
        } else {
            console.error(error);
        }
    }
}

async function openFile() {
    var filePath = await open();
    if (filePath != null) maineditor.loadFile(filePath);
}

document.getElementById('btn-save')?.addEventListener('click', saveFile);
hotkeys("ctrl+s", () => { saveFile(); });
maineditor.addAction({
    id:"save",
    label:"Save File",
    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS],
    run: saveFile,
});
document.getElementById('btn-open')?.addEventListener('click', openFile);
hotkeys("ctrl+o", () => { openFile(); });
maineditor.addAction({
    id:"open",
    label:"Open File",
    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyO],
    run: openFile,
});
