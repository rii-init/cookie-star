export function named(thing: Function, name: string): Function {
    (thing as any).typeName = name;
    
    return thing;
}