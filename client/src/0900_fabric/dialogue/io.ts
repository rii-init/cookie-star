export interface DialogueIO {
    [person: string]: { 
        in: string, out: string 
                      }[]
}


export const dialogue = {
    ultr7a: [

        {
            in: "_default_",
            out: "welcome"
        },

        {
            in:  "hello",
            out: "welcome"
        },

    ]
}