

export class SocketClient {
    private handlers: { [key: string]: (meta: any, event: any) => void } = {};

    constructor(
        private socket = new WebSocket("ws://ultr7a.com/api/socket")
    ) {

        this.socket.onopen = (event) => {
            console.log("WebSocket Connection <3 \\OwO_X_UwU/.", event);
        }

        this.socket.onmessage = (event) => {
            const eventTypeLength = parseInt(event.data[0], 16);
            const eventType  = event.data.substring(1, eventTypeLength+1);

            const metaLength = parseInt(
                                event.data.substring(eventTypeLength+1, eventTypeLength+3),
                                16
                               );

            const metaData   = event.data.substring(
                                eventTypeLength+3, 
                                eventTypeLength+3+metaLength
                               );

            const handler = this.handlers[eventType];
            if (handler) {
                handler(
                    metaData, 
                    event.data.substring(eventTypeLength+3+metaLength, 999999));
            }
        }
    }

    public send(type: string, meta: string, payload: string) {
        const msg = `${type.length.toString(16)}${type}${meta.length.toString(16)}${meta}${payload}`;
        this.socket.send(msg);
    }

    public setOnMessageHandler(event: string, handler: (meta: any, event: any) => void) {
        this.handlers[event] = handler;
    }

    public setOnErrorHandler(handler: (event: Event) => void) {
        this.socket.onerror = handler;
    }

    setOnCloseHandler(handler: (event: CloseEvent) => void) {
        this.socket.onclose = handler;
    }
}
