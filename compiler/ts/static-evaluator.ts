const numericExpressionPattern = /[-+]?[0-9]+\s*(?:[\+\*\-\/\%]+\s*[-+]?[0-9]+\s*)+$/;

// input is the value of the attribute, without the quotes.
export function evalNumericExpression(input: string): string {

        // First let's check the delimiter:
        const delimiter = input[0];

        input = input.slice(1, -1);

        // 
        // Disclaimer: This could get a bit intense.
        // Viewer Discretion is Advised
        // 

        // Is it a vector?  Whatcha lookin' at?
        if (input[0] == '[') {
            // Yeah!
            return delimiter +
                "[" + input.slice(1, -1).split(',').map((component) => {
                // Everybody in the list!, Let me see you add this!
                return evalNumericExpressionScalar(component);
                }).join(',') 
                + "]"
                + delimiter;
        } else

        // Is it an object? Whatcha waitin' for?
        if (input[0] == '{') {
            // Okay!
            return delimiter + 
                "{" + input.slice(1, -1).split(',').map((component) => { 
                    // We got key-value pairs, all up in this software. 
                    // So break-it down, now! People hearin' this, from across town.
                    const [key, value] = component.split(':');

                    return `${key}:${evalNumericExpressionScalar(value)}`;
                }).join(',') 
                + "}"
                + delimiter;
        }

        // WHAT?
        // Just a simple string?  Step your game up!
        return delimiter + evalNumericExpressionScalar(input) + delimiter;
}

export function evalNumericExpressionScalar(input: string): string {
    if (input === null || input === undefined) return "NaN";

    if (!isNaN(Number(input))) return input;

    // If someone managed to inject something malicious, 
    // I'd actually be impressed, first and foremost, and then probably concerned,
    // because this would indicate a problem with the universe.
    // However, I'm going to save that task for a philosopher, or self-help author.'

    return numericExpressionPattern.test(input) ? eval(input) : input;
}