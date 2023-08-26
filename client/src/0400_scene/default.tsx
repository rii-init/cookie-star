import { useLocation } from "wouter";

import { Evaluator } from "../0100_content/evaluator";
import { useEffect, useState } from "react";
import { SGS } from "../0100_content/static-generated-site";
import { RunCommands } from "../0100_content/configure";
import { Parser } from "../0100_content/parser";

export const DefaultScene = () => {
    const [location, setLocation] = useLocation();
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        // parse the config file:
        const config = Parser.parseConfig();
        // run the commands found in the html:
        RunCommands.invoke(config);
    }, [])

    useEffect(() => {
        
        // page url changed, for example /, or /cv, or /articles/designing-fursuit 
        SGS.loadContent(location).subscribe(() => {
            console.log("Hmm.. is react a good framework actually?");
            console.log("well, this should update. Let's see");
            setUpdate(update + 1);
        });

    }, [location]);

    return (
        <group>
            <Evaluator location={location} update={update}></Evaluator>
        </group>
    );
}