/**
 * Create triadic colors
 * @param hsv HSV color value repesented by an array
 * @param distance distance between two color siblings
 * @returns array of complimentary HSV colors
 */

export default function generateTriadColors(hsv: [number, number, number], arc: number): [number, number, number][] {
    const colors: [number, number, number][] = []
    for (let i = 0; i < 5; i++) {
        colors.push([(hsv[0] + arc * i) % 1, 1, 1])
    }
    return colors
}