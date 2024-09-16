import { open } from "@tauri-apps/plugin-dialog";
import { CodeEditor } from "./CodeEditor";

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
// maineditor.readFile("D:/oi/test.cpp");

document.getElementById('btn-save')?.addEventListener('click', async () => {
    await maineditor.writeFile("D:/oi/test.cpp");
});

document.getElementById('btn-open')?.addEventListener('click', async () => {
    var filePath = await open({
        directory: false,
        multiple: false
    });
    if (filePath != null) maineditor.loadFile(filePath);
})
