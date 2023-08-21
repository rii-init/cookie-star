export interface SpaceConfig {
    "call"?: [string, any[]][]
}

export class Parser {
    public static parse(elem: HTMLElement): Record<string, any> {
        const attrs: Record<string, any> = {};
     
        for (let i = 0; i < elem.attributes.length; i++) {
            const attribute = elem.attributes[i];

            if (['"', "'"].includes(attribute.value[0])) {
                attrs[attribute.name] = attribute.value.slice(1, -1);
            } else 

            if (['{', '['].includes(attribute.value[0])) {
                attrs[attribute.name] = JSON.parse(attribute.value);
            } else

            if (isNaN(attribute.value as any) === false) {
                attrs[attribute.name] = parseFloat(attribute.value)
            } else if (attribute.value === 'null') {
                attrs[attribute.name] = null;
            } else if (attribute.value === 'true') {
                attrs[attribute.name] = true;
            } else if (attribute.value === 'false') {
                attrs[attribute.name] = false;
            } 

            else {
                attrs[attribute.name] = attribute.value+""; //okay it's a string then
            }

        }

        return attrs;
    }

    public static parseConfig(): SpaceConfig {
        const config = document.getElementById('page-config') as HTMLScriptElement;

        if (config && config.innerText.length > 4) {
            return JSON.parse(config.innerHTML.replace('/*', '').replace('*/', ''));
        } 
        
        return {}; // nice. no config was needed
    }
}