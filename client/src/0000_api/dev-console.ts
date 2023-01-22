export class DevConsole {
    private static send(payload: any) {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/dev-console', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ payload }));
    }
    
    public static log(...args: any[]) {
        this.send({ type: 'log', args });
    }
}