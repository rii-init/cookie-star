import { SocketClient } from "./socket.client";


describe("SocketClient", ()=> {
    const Mocket = {
        onopen: Function,
        onmessage: Function
    }

    const client = new SocketClient(Mocket as any);

    let payload = "";
    let meta = "";
    let expected = "{ message: 'hello!' }";
    let expectedMeta = "x=1,y=2,z=3";

    client.setOnMessageHandler("message", (_meta: any, _payload: any) => {
        payload = _payload;
        meta = _meta;
    });

    Mocket.onmessage({ data: "7messageB x=1,y=2,z=3{ message: 'hello!' }"} as any)

    it("should handle and parse an incoming message", ()=>{
        if (meta === expectedMeta) {
            console.log("ro-ro-Roll Dat -_-/ ")
        } else {
            console.log("h-h-hold up! [inconsistency detected];");
            console.log("actual result was: ", meta);
        }
        expect(meta).toBe(expectedMeta);

        if (payload === expected) {
            console.log("We keep on rockin'! \\UwU_");
        } else {
            console.log("we never stopin'  [but let's look at this test again]");
            console.log("actual result was: ", payload);
        }
        expect(payload).toBe(expected);
    })
    

});