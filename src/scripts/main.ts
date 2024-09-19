import { open, save } from "@tauri-apps/plugin-dialog";
import { CodeEditor } from "./CodeEditor";
import { KeyCode, KeyMod } from "monaco-editor";
import hotkeys from 'hotkeys-js';
import { initHeader } from "./header";

initHeader();

self.MonacoEnvironment = {
    getWorkerUrl: function (_moduleId, label) {
        if (label === 'typescript' || label === 'javascript') {
            return 'monaco-editor/esm/vs/language/ts.worker.js';
        }
        return 'monaco-editor/esm/vs/language/editor.worker.js';
    }
};

var maineditor = new CodeEditor(document.getElementsByTagName('main')[0], "");

export async function saveFile() {
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

export async function openFile() {
    var filePath = await open();
    if (filePath != null) maineditor.loadFile(filePath);
}

declare global {
    interface Window {
        saveFile: () => void;
        openFile: () => void;
    }
}

if (typeof window !== 'undefined') {
    window.saveFile = saveFile;
    window.openFile = openFile;
}

const btn_saves = document.getElementsByClassName('btn-save');
for (const btn_save of btn_saves) {
    btn_save.addEventListener('click', saveFile);
}
hotkeys("ctrl+s", () => { saveFile(); });
maineditor.editor.addAction({
    id: "save",
    label: "Save File",
    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyS],
    run: saveFile,
});

const btn_opens = document.getElementsByClassName('btn-open');
for (const btn_open of btn_opens) {
    btn_open.addEventListener('click', openFile);
}
hotkeys("ctrl+o", () => { openFile(); });
maineditor.editor.addAction({
    id: "open",
    label: "Open File",
    keybindings: [KeyMod.CtrlCmd | KeyCode.KeyO],
    run: openFile,
});

maineditor.editor.onDidChangeCursorPosition((_) => {
    const currentPositionElement = document.getElementsByTagName("cursor-position")[0];
    currentPositionElement.innerHTML = `行 ${maineditor.editor.getPosition()?.lineNumber}, 列 ${maineditor.editor.getPosition()?.column}`;
});
window.addEventListener("DOMContentLoaded", () => {
    maineditor.editor.layout();
    const currentPositionElement = document.getElementsByTagName("cursor-position")[0];
    currentPositionElement.innerHTML = `行 ${maineditor.editor.getPosition()?.lineNumber}, 列 ${maineditor.editor.getPosition()?.column}`;
});

import { Window } from '@tauri-apps/api/window';

const appWindow = new Window('main');

document
    .getElementById('titlebar-minimize')
    ?.addEventListener('click', () => appWindow.minimize());
document
    .getElementById('titlebar-maximize')
    ?.addEventListener('click', () => appWindow.toggleMaximize());
document
    .getElementById('titlebar-close')
    ?.addEventListener('click', () => appWindow.close());