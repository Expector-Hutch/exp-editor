import { invoke } from "@tauri-apps/api/core";

export async function read_file(path: string) {
    return await invoke<string>("read_file", { path });
}

export async function write_file(path: string, content: string) {
    return await invoke('write_file', { path, content });
}