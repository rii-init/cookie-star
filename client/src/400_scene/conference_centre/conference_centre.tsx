import { Transport } from "../../content_transport";

export let conference_centre = () => {
    return (
        <main>
            { Transport.getMain() }
        </main>
    );
}