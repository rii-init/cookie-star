import { Entity } from "."

export const FramePagination = (p: {}) => {

    /*  interesting situation, there's no button available component yet
        can't use a div because this is for vr
        LinkSurface has visual feedback, works with vr hand tracking, and shows text, but it's not a button
        + need
            + base component class for both Link and Button
                + Interactable
                    + provides
                        + responds to various input events
                            + main:
                                + hover
                                + click
                            + nice to have:
                                + touch
                                + release
                        + event handler(s)
                        + text label
                        + visual feedback

    */
    return (
        <Entity >
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
            <meshBasicMaterial attach="material" color="white" />
            { /** 
             * 
             * <ButtonInteractable 
             *    onClick={ () => console.log("prev") }
             *    onHover={ () => console.log("hover prev") } 
             * />
             * 
             * <ButtonInteractable
             *    onClick={ () => console.log("next") }
             *    onHover={ () => console.log("hover next") }
             * />
             * 
            */}
        </Entity>
    )
}