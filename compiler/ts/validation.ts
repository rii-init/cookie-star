export const usage_string = 'Usage: node compiler/index.ts <render-page|modify-index.html> <input> <output>'

export function validateCommand(params: string[], expected_params: number, usage: string) {
    if (params.length < expected_params) {
        console.log(usage);
        process.exit(1);
    }
}