export interface GroupMainProps {
    children?: React.ReactNode;
    className?: string;
}

export const GroupMain = (props: GroupMainProps) => {
    return (
        <group>
            {props.children}
        </group>
    )
}