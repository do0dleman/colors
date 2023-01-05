import generateAnalogColors from "./generateAnalogColors"
import generateColorsByFunction from "./generateColorsByFunction"
import generateColorShades from "./generateColorShades"
import generateTetrColors from "./generateTetrColors"

/**
 * Generates random colors
 * @param hsv HSV color value repesented by an array
 * @returns 5 generated colors
 */
export default function generateColors(hsv: [number, number, number]): [number, number, number][] {
    const rnd = Math.round(Math.random() * 2)
    let colors: [number, number, number][] = []

    if (rnd === 0) {
        colors = generateColorShades(hsv, (Math.random() + 2) / 10, Math.round(Math.random()))
    }
    if (rnd === 1) {
        colors = generateColorsByFunction(hsv, generateAnalogColors, (Math.random() + 1.5) / 10, false)
    }
    if (rnd === 2) {
        colors = generateColorsByFunction(hsv, generateTetrColors, (Math.random() + 0.25) / 10, false)
    }

    return colors
}