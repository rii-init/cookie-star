export class SocketClient {
    private socket: WebSocket;
    private handlers: { [key: string]: (event: MessageEvent) => void } = {};

    constructor() {
        this.socket = new WebSocket("ws://ultr7a.com/api");

        this.socket.onopen = (event) => {
            console.log("WebSocket connection opened.", event);
        }

        this.socket.onmessage = (event) => {
            const eventTypeLength = parseInt(event.data[0], 16);
            const eventType = event.data.substring(0, eventTypeLength);
            
            const handler = this.handlers[eventType];
            if (handler) {
                handler(event.data.substring(eventTypeLength, 999999));
            }
        }
    }

    public send(msg: string) {
        this.socket.send(msg);
    }

    public setOnMessageHandler(event: string, handler: (event: MessageEvent) => void) {
        this.handlers[event] = handler;
    }

    public setOnErrorHandler(handler: (event: Event) => void) {
        this.socket.onerror = handler;
    }

    setOnCloseHandler(handler: (event: CloseEvent) => void) {
        this.socket.onclose = handler;
    }
}
