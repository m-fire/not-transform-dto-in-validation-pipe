import { existsSync, RmOptions, rmSync } from 'fs'

export function deleteFile(path: string, options?: RmOptions) {
    rmSync(path, options)
}

export function hasFile(path: string): boolean {
    return existsSync(path)
}
