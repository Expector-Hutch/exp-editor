import * as monaco from 'monaco-editor';
import { read_file, write_file } from './tauriInvokes';

export class CodeEditor {
    private editor: monaco.editor.IStandaloneCodeEditor;
    private linkedPath: string | null = null;

    constructor(container: HTMLElement, filePath: string | null) {
        this.editor = monaco.editor.create(container, {
            language: "plaintext",
            cursorSmoothCaretAnimation: "on",
            cursorBlinking: "phase",
            automaticLayout: true,
            theme: "vs-dark"
        });
        if (filePath != null) {
            this.loadFile(filePath);
        }
    }

    linkFile(filePath: string | null) {
        this.linkedPath = filePath;
    }

    unlinkFile() {
        this.linkedPath = null;
    }

    async loadFile(filePath: string | null): Promise<void> {
        this.linkFile(filePath);
        if (this.linkedPath != null) {
            try {
                const content = await read_file(this.linkedPath);
                this.editor.setValue(content);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }
    }

    closeFile() {
        this.unlinkFile();
        this.editor.setValue("");
    }

    async saveFile(): Promise<void> {
        if (this.linkedPath != null) {
            try {
                const content = this.editor.getValue();
                await write_file(this.linkedPath, content);
            } catch (error) {
                throw new Error("NoFileLinked");
            }
        } else {
            throw new Error("NoFileLinked");
        }
    }

    addAction(descriptor: monaco.editor.IActionDescriptor) { this.editor.addAction(descriptor); }
}