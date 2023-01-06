export interface DialogueOutput {
    [person: string]: {
        [output: string]: string[]
    }
} 

export const output = {
    ultr7a: {

        welcome: [
            "Hi! how are you?",
            "Hey gorge!",
            "What's good?",
            "Hi",
            "Sup?"
        ],

        imGoingToBeBad: [
            "I'm going to be bad",
            "Do you want to be bad with me?",
            "I'm going to be bad, do you want to be bad with me?",
        ]

    }
}