import { Transport } from "../../content_transport"


export const show_room = () => {
    return (
        <main>
            { Transport.getMain() }
        </main>
    )
}