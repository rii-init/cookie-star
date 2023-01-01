import { LoadContent } from "../../load_content"


export const show_room = () => {
    return (
        <main>
            { LoadContent.getMain() }
        </main>
    )
}