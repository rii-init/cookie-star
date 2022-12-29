import { Flat } from "../../../100_element/flat/[flat]";

export interface NavigationProps {
    // list of: [name, url]
    navigation: [string, string][];
};

export let NavigationSurface = (props: NavigationProps) => {
    return (
        <Flat>
            {
                props.navigation.map((item, index) => {
                    return (
                        <a key={index} href={item[1]}>{item[0]}</a>
                    )
                })
            }
        </Flat>
    )
};