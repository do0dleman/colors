import { ReactNode, RefObject } from "react"

interface containerProps {
    className: string
    children: ReactNode
    innerRef?: RefObject<HTMLDivElement>
}

export default function Container(props: containerProps) {
    return (
        <div ref={props.innerRef} className={`${props.className} -container`}>
            {props.children}
        </div>
    )
}