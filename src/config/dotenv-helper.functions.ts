import process from 'process'

export function isPresentEnv(suffix: string): boolean {
    return process.env.NODE_ENV?.toLowerCase() === suffix
}
