import { ReactElement, JSXElementConstructor } from "react";
import { BehaviorSubject } from "rxjs";
import { Mesh, BufferGeometry, Material, Group } from "three";

import { named } from "../../0000_concept/named";
import { System } from ".";
import { EntityState } from "../../0300_entity";
import { ContentFrameProps } from "../../0300_entity/content.frame";


/*
ContentFrame component:
    + for the home page, (especially,) to display all blog posts
    +
    + in case javascript is disabled, 
        + the default behavior of the component HTML/JSX should show pagination buttons
    + if javascript is enabled, 
        + the component should respond to scrolling and load more content, 
            + the "Scroll Track" should be updated to understand the new length of the page
        + and the pagination buttons should be hidden
    + the component should be able to handle the following scenarios:
        + scrolling to the end of the collection..
            + it should avoid making unnecessary requests (we can be polite) 
    +
    + state:
        + collection_url: string
        + batch_size: number
        +
        + loading: boolean
        + error: string
        +
        + loaded_item_count: number
        + total_item_count: number
        +
        + items: BehaviorSubject<string[]>
            + each element:
                + string representation of html(with embedded jsx)
                + (external) SGS (statically generated site model) 
                    + object has to be interacted with to render the output of this infinite scroll component    
*/


export class ContentState {
    loading:        boolean;
    error:          string;

    loaded_item_count: number;
    total_item_count:  number;

    items: BehaviorSubject<string[]>;

    constructor() {
        this.loading = false;
        this.error = "";
        this.loaded_item_count = 0;
        this.total_item_count = 0;
        this.items = new BehaviorSubject<string[]>([]);
    }
} 


export const Content = named(function(p: ContentFrameProps){ return null }, "Content");

export class ContentSystem implements System {
    
    registerComponent(component: ReactElement<any, string | JSXElementConstructor<any>>, 
                          state: EntityState, 
                    parentMesh?: Mesh<BufferGeometry, Material | Material[]> | Group | undefined
    ) {

    }

    
    dependencies?: any;
    
    
    update(delta: number): void {
        // throw new Error("Method not implemented.");
    }
  
    removeComponent(component: any): void {
        // throw new Error("Method not implemented.");
    }
}