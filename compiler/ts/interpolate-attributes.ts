import { evalNumericExpression } from "./static-evaluator";

const attribute_value_pattern = /(?:[a-z](?:[a-zA-Z0-9_\-]+))=('[^']+'|"[^"]+")/;
const attribute_pattern = /([a-z](?:[a-zA-Z0-9_\-]+)=(?:'[^']+'|"[^"]+"))/g;
const math_const_pattern = /(?:Math\.)([A-Z]+)/g;


export const interpolateAttributes = (input: string): string => {

    // interpolate constants in attributes:
    // first get all of the attributes in their context:
    const attributes = input.match(attribute_pattern) ?? [];

    // then in each instance, interpolate the value portion in the input string:
    attributes.forEach((attribute) => {
        
        const interpolated = attribute.replace(math_const_pattern, (match, p1) => {
            // Eval is not very safe, so.... instead, let's handle this case-by-case:
            // ...and by that, I mean, `Math` is the only thing that's allowed for v1.0.0
            
            return match.replace(match, (Math as any)[p1]);
        });  

        
        // Now that we've interpolated the value, we can evaluate the expression:
        const interpolatedValue = interpolated.match(attribute_value_pattern)?.[1] ?? "0";


        const evaluated = evalNumericExpression(interpolatedValue);

        // Finally replace the value of the attribute with the evaluated interpolation:
        const evaluatedAttribute = attribute.replace(attribute_value_pattern, (match, p1) => {
            return match.replace(p1, evaluated);
        });


        input = input.replace(attribute, evaluatedAttribute);
    });
    
    
    // Sometimes simplicity is cool, too.
    return input;
}

