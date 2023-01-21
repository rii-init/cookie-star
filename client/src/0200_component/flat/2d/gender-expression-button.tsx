import { ReactNode, useState } from "react";

export interface GenderExpressionButtonProps {
    children?: ReactNode
}

const options = ["⚥", "♀", "♂"]

let idx = 0,
    nextIdx = 1;

export let genderExpression = 0;

export const GenderExpressionButton = (p: GenderExpressionButtonProps) => { 
    let [expression, changeExpression] = useState(0)

        
    function next() {
        changeExpression(nextIdx)
        idx = nextIdx
        nextIdx = (idx + 1) % options.length   
        genderExpression = idx % options.length;
    }

    return (
        <div className="ui_2d__button gender-expression"
             onClick={()=>{ next() }}>
            <span>{options[nextIdx]}</span>
        </div>
    );
}