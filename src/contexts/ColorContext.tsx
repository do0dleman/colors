import { createContext } from "react"

interface IColorContext {
    color: [number, number, number]
    setColor: Function
    doUndo: boolean
    setDoUndo: Function
    doRedo: boolean
    setDoRedo: Function
    doNewColor: boolean
    setDoNewColor: Function
    genMethod: number
    setGenMethod: Function
    lockedColors: ([number, number, number] | null)[]
    setLockedColors: Function
}

export const ColorContext = createContext<IColorContext>({
    color: [1, 1, 1],
    setColor: () => { },
    doUndo: false,
    setDoUndo: () => { },
    doRedo: false,
    setDoRedo: () => { },
    doNewColor: true,
    setDoNewColor: () => { },
    genMethod: -1,
    setGenMethod: () => { },
    lockedColors: [null, null, null, null, null],
    setLockedColors: () => { }
}) 