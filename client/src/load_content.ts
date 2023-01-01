export class LoadContent {

    private static heading: string = "";
    private static main: string = "";


    public static LoadHeading(): void {
        LoadContent.heading = document.querySelector("h1")?.innerHTML || "";
    }

    public static LoadMain(): void {
        LoadContent.main = document.querySelector("#main")?.innerHTML || "";
    }

    public static getHeading(): string {
        return LoadContent.heading;
    }

    public static getMain(): string {
        return LoadContent.main;
    }

}