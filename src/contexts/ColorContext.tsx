import { createContext } from "react"


interface IColorContext {
    color: [number, number, number]
    setColor: Function
}

export const ColorContext = createContext<IColorContext>({
    color: [1, 1, 1],
    setColor: () => { },
}) 