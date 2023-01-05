/**
 * Creates shade of 1 hue value
 * @param hsv HSV color value repesented by an array
 * @param step step between varying values
 * @param mode if 0 V is changing, if 1 S is changing (in HSV)
 * @returns array of HSV colors with different value
 */

export default function generateColorShade(hsv: [number, number, number], step: number, mode: number): [number, number, number] {
    let color: [number, number, number] = [1, 1, 1]
    if (mode === 0) {
        color = [hsv[0], 1, Math.max(1 - step, 0)]
    }
    if (mode === 1) {
        color = [hsv[0], Math.max(1 - step, 0), 1]
    }

    return color
}