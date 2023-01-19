import generateColorShade from "./generateColorShade"

/**
 * Creates different shades of 1 hue value
 * @param hsv HSV color value repesented by an array
 * @param step step between varying values
 * @param mode if 0 V is changing, if 1 S is changing (in HSV), if 2 L is changing (in HSL)
 * @returns array of HSV colors with different value
 */

export default function generateColorShades(hsv: [number, number, number], step: number, mode: number = 2): [number, number, number][] {
    const colors: [number, number, number][] = []
    const doRandom = Math.random() > 0.2
    if (mode === 0) {
        for (let i = 0; i < 5; i++) {
            colors.push(generateColorShade(hsv, step * i, 0))
        }
    }
    if (mode === 1) {
        for (let i = 0; i < 5; i++) {
            colors.push(generateColorShade(hsv, step * i, 1))
        }
    }
    if (mode === 2) {
        for (let i = 0; i < 2; i++) {
            colors.push(generateColorShade(hsv, step * 2 / (i + 1), 0))
        }
        for (let i = 0; i < 3; i++) {
            colors.push(generateColorShade(hsv, step * i, 1, doRandom))
        }
    }
    return colors
}