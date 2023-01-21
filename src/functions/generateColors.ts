import generateAnalogColors from "./generateAnalogColors"
import generateColorsByFunction from "./generateColorsByFunction"
import generateColorShades from "./generateColorShades"
import generateTetrColors from "./generateTetrColors"
import generateTriadColors from "./generateTriadColors"

/**
 * Generates random colors
 * @param hsv HSV color value repesented by an array
 * @returns 5 generated colors
 */
export default function generateColors(hsv: [number, number, number], method: number): [number, number, number][] {
    if (method === -1) method = Math.round(Math.random() * 3.49)
    let colors: [number, number, number][] = []
    const doSort = Math.random() > 0.5

    if (method === 0) {
        const mode = Math.round(Math.random() * 2)
        let off = (Math.random() + 1.5) / 10
        if (mode === 2) off = (Math.random() + 2.5) / 10
        colors = generateColorShades(hsv, off, mode)
    }
    if (method === 1) {
        colors = generateColorsByFunction(hsv, generateAnalogColors, (Math.random() + 1.5) / 10, doSort)
    }
    if (method === 2) {
        colors = generateColorsByFunction(hsv, generateTetrColors, (Math.random() + 0.25) / 10, doSort)
    }
    if (method === 3) {
        colors = generateColorsByFunction(hsv, generateTriadColors, (Math.random() * 1.5 + 2) / 10, doSort)
    }

    return colors
}