/**
 * Creates shade of 1 hue value
 * @param hsv HSV color value repesented by an array
 * @param step step between varying values
 * @param mode if 0 V is changing, if 1 S is changing (in HSV)
 * @returns array of HSV colors with different value
 */

export default function generateColorShade(hsv: [number, number, number], step: number, mode: number, doRandom: Boolean = true): [number, number, number] {
    let color: [number, number, number] = hsv
    let randS = 0
    let randV = 0
    if (doRandom) {
        randS = Math.random() * 0.1
        randV = Math.random() * 0.1
    }
    if (mode === 0) {
        color = [hsv[0], 1 - randS, Math.min(Math.max(1 - step, 0) + randV, 1)]
    }
    if (mode === 1) {
        color = [hsv[0], Math.min(Math.max(1 - step, 0) + randS, 1), 1 - randV]
    }

    return color
}