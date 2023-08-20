export interface SpaceConfig {
    "call"?: [string, any[]][]
}

export class Parser {
    public static parse(elem: HTMLElement): Record<string, any> {
        const attrs: Record<string, any> = {};
     
        for (let i = 0; i < elem.attributes.length; i++) {
            const attribute = elem.attributes[i];

            if (['{', '['].includes(attribute.value[0])) {
                attrs[attribute.name] = JSON.parse(attribute.value);
            }

            if (isNaN(attribute.value as any) === false) {
                attrs[attribute.name] = parseFloat(attribute.value)
            } else if (attribute.value === 'null') {
                attrs[attribute.name] = null;
            } else if (attribute.value === 'true') {
                attrs[attribute.name] = true;
            } else if (attribute.value === 'false') {
                attrs[attribute.name] = false;
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