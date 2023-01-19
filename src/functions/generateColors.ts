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
export default function generateColors(hsv: [number, number, number]): [number, number, number][] {
    let rnd = Math.round(Math.random() * 3.49)
    let colors: [number, number, number][] = []
    const doSort = Math.random() > 0.5

    if (rnd === 0) {
        const mode = Math.round(Math.random() * 2)
        console.log(mode)
        let off = (Math.random() + 1.5) / 10
        if (mode === 2) off = (Math.random() + 2.5) / 10
        colors = generateColorShades(hsv, off, mode)
    }
    if (rnd === 1) {
        colors = generateColorsByFunction(hsv, generateAnalogColors, (Math.random() + 1.5) / 10, doSort)
    }
    if (rnd === 2) {
        colors = generateColorsByFunction(hsv, generateTetrColors, (Math.random() + 0.25) / 10, doSort)
    }
    if (rnd === 3) {
        colors = generateColorsByFunction(hsv, generateTriadColors, (Math.random() * 1.5 + 2) / 10, doSort)
    }

    return colors
}