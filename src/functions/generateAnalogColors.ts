/**
 * Create analogous colors with same S and V
 * @param hsv HSV color value repesented by an array
 * @param step distance between sibling colors
 * @returns array of complimentary HSV colors
 */

export default function generateAnalogColors(hsv: [number, number, number], step: number): [number, number, number][] {
    const colors: [number, number, number][] = []
    for (let i = 0; i < 5; i++) {
        colors.push([(1 + hsv[0] - (step * 2) + step * i) % 1, 1, 1])
    }
    return colors
}