export class Transport {

    private static heading: string = "";
    private static main: string = "";


    public static LoadHeading(): void {
        const heading = document.querySelector("h1");

        if (heading) {
            Transport.heading = heading.innerHTML || "";
            heading.parentElement?.removeChild(heading);
        }
    }

    public static LoadMain(): void {
        const main = document.querySelector("#main");

        if (main) {
            Transport.main = main.innerHTML || "";
            main.parentElement?.removeChild(main);
        }
    }

    public static getHeading(): string {
        return Transport.heading;
    }

    public static getMain(): string {
        return Transport.main;
    }

}