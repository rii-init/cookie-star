import { ReactNode, useRef, useState } from "react";

export interface KeyboardConsoleProps { 
    children: ReactNode;
    socket:   WebSocket;
    user_id:  string;
}

export const KeyboardConsole = (p: KeyboardConsoleProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [activated, setActive] = useState(false);

    if (!activated) {
        return (
            <div onClick={() => setActive(true)}>
                <div style={{fontSize:"3.5vw"}}>
                    ⌨ 
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <div onClick={() => setActive(false)}>
                <div style={{fontSize:"3.5vw"}}>
                    ⌨ 
                </div>
            </div>
            <input type="text"
                    ref={ref}
              onKeyDown={(e) => {
                    p.socket.send("Auser_input"+p.user_id+":"+e.key);        
                }}
            />
            {p.children}
        </div>
    );
}