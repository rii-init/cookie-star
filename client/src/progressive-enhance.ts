/*************************************
 * 
 *  Progressively Enhance the page, 
 *  by removing the heading and main,
 *  and loading them via React.js
 * 
 *************************************/

export class ProgressiveEnhance {

    public static LoadHeading(): void {
        const heading = document.querySelector("h1");

        if (heading) {
            heading.parentElement?.removeChild(heading);
        }
    }

    public static LoadMain(): void {
        const main = document.querySelector("#main");

        if (main) {
            main.parentElement?.removeChild(main);
        }
    }
}
