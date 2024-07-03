export class DevConsole {
    static send(payload) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/dev-console', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ payload }));
    }
    static log(...args) {
        this.send({ type: 'log', args });
    }
}
//# sourceMappingURL=dev-console.js.map