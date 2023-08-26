import { Observable } from "rxjs";
import { Parser } from "./parser";
import { RunCommands } from "./configure";

/**
 * # Statically Generated Site
 * ``` 
 * AJAX? (fetching HTML from an API?)  
 * 
 * Now-a-days it's the ways of-the-underground! 😎
 * 
 * Seriously, it's actually kind of beautiful, given the right circumstances.
 * 
 * This class loads the static site, 
 * allowing react to do cool stuff with the content,
 * or a very minimal, yet useful site, if javascript is disabled, or the connection is slow. 
 * ```
 */
export class SGS {
    //  The html files already exist. 
    //  You move through them, like
    //  your consciousness moves through the space-time continuum. 
    public static firstLoad: boolean = true;
    public static thingsToUpdate: { [thing: string]: (root: HTMLElement) => NodeList } = {
        // head
        title:  (root: HTMLElement) => root.querySelectorAll("title"),
        meta:   (root: HTMLElement) => root.querySelectorAll("meta"),
        // body
        main:   (root: HTMLElement) => root.querySelectorAll("main"),
        config: (root: HTMLElement) => root.querySelectorAll("script#page-config"),
    }
    public static loadContent(domainResource: string): Observable<void> {

        return new Observable<void>((observer) => {
            if (SGS.firstLoad) {
                SGS.firstLoad = false; 
                observer.next(); // it's magic ✅
            }

            const xhr = new XMLHttpRequest();

            xhr.open('GET', domainResource);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    SGS.updateClient(xhr.response);
                    observer.next();
                    observer.complete();
                } else {
                    observer.error(xhr.statusText);
                }
            };

            xhr.send();
        })
    }

    /**
     * 
     * @param payload is the entire static HTML page
     */
    public static updateClient(payload: string): void {

        // Filter out static js and css artifacts before creating the temporary container:
        // This prevents the browser from trying to load them. Those will be the same on every page.
        payload = payload.replaceAll(/<link [^>]+>|<script src="[^"]+"><\/script>/g, "")
        // Remove the <html> and <body> tags 😃   
        payload = payload.replaceAll(/<\/?(html|body)>/g, "");


        const tempContainer = document.createElement('div');
              tempContainer.innerHTML = payload;
        


        /////////////////////////////////////////////////////
        ///                                               ///
        /// Update <head> components                      ///
        ///                                               ///
        /////////////////////////////////////////////////////

        const newTitle = SGS.thingsToUpdate.title(tempContainer);
        const newMeta = SGS.thingsToUpdate.meta(tempContainer);

        // Title is easy going:
        if (newTitle.length > 0) {
            document.title = newTitle[0]?.textContent ?? document.title;
        }

        // Meta tags need to be given additional direction and care:
        if (newMeta.length > 0) {
            // remove old meta tags
            document.querySelectorAll("head meta").forEach(meta => meta.remove());
            // add new meta tags
            newMeta.forEach(meta => document.head.appendChild(meta));
        }


        /////////////////////////////////////////////////////
        ///                                               ///
        /// Update <body> components                      ///
        ///                                               ///
        /////////////////////////////////////////////////////

        const main = document.querySelector("body main");
        const page_config = document.querySelector("script#page-config");

        if (main) {

            // Clear the existing contents of the container
            main.innerHTML = '';

            // Get the parsed fragment from the temporary container
            const tempMain = SGS.thingsToUpdate.main(tempContainer);

            // Append each child element from the parsed fragment to the container
            tempMain[0].childNodes.forEach(child => {
                 if (child.nodeType === Node.ELEMENT_NODE) {
                     main.appendChild(child);
                 }
            });
        }

        if (page_config) {
            // it's actually json data, but we're going to clear the config element in the dom anyway
            page_config.innerHTML = '';
            // Get the parsed fragment from the temporary container
            const tempConfig = SGS.thingsToUpdate.config(tempContainer);
    
            // call the parser here
            RunCommands.invoke(
                Parser.parseConfig(tempConfig[0]?.textContent ?? "{}")
            );
        }
    }

}