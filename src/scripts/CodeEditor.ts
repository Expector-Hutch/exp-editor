import * as monaco from 'monaco-editor';
import { read_file, write_file } from './tauriInvokes';

export class CodeEditor {
    private editor: monaco.editor.IStandaloneCodeEditor;

    constructor(container: HTMLElement, filePath: string | null) {
        this.editor = monaco.editor.create(container, {
            language: "plaintext",
            cursorSmoothCaretAnimation: "on",
            cursorBlinking: "phase",
            theme: "vs-dark"
        });
        if (filePath != null) {
            this.loadFile(filePath);
        }
    }

    async loadFile(filePath: string): Promise<void> {
        try {
            const content = await read_file(filePath);
            this.editor.setValue(content);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }

    async writeFile(filePath: string): Promise<void> {
        try {
            const content = this.editor.getValue();
            await write_file(filePath, content);
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }
}