import * as monaco from 'monaco-editor';

export class CodeEditor {
    private editor: monaco.editor.IStandaloneCodeEditor;

    constructor(container: HTMLElement, file_path: string) {
        this.editor = monaco.editor.create(container, {
            language: "plaintext",
            cursorSmoothCaretAnimation: "on",
            cursorBlinking: "phase",
            theme: "vs-dark"
        });
    }
}