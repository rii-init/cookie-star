export class LoadContent {

    private static heading: string = "";
    private static content: string = "";


    public static LoadHeading(): void {
        LoadContent.heading = document.querySelector("h1")?.innerHTML || "";
    }

    public static LoadContent(): void {
        LoadContent.content = document.querySelector("main")?.innerHTML || "";
    }

    public static getHeading(): string {
        return LoadContent.heading;
    }

    public static getContent(): string {
        return LoadContent.content;
    }

}