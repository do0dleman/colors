/**
 * Create tetradic colors
 * @param hsv HSV color value repesented by an array
 * @param distance distance between two color siblings
 * @returns array of complimentary HSV colors
 */

export default function generateTetrColors(hsv: [number, number, number], distance: number): [number, number, number][] {
    const colors: [number, number, number][] = []
    for (let i = 0; i < 5; i++) {
        let off: number = 0
        off += Math.floor((i + 1) / 5) * 0.07
        off += 0.5 * (i % 2)
        if (i % 5 === 2 || i % 5 === 3) off += distance
        const color: [number, number, number] = [(hsv[0] + off) % 1, 1., 1]
        colors.push(color)
    }
    return colors
}