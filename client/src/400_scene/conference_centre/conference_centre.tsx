import { LoadContent } from "../../load_content";

export let conference_centre = () => {
    return (
        <main>
            { LoadContent.getMain() }
        </main>
    );
}