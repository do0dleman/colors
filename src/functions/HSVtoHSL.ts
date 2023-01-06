/** 
 * Converts HSV color value to HSL color value
 * @param {[number, number, number]} hsv HSV color value, where hue is normalized
 * @returns HSL color value
**/

export default function HSVtoHSL(hsv: [number, number, number]): [number, number, number] {
    let hsl: [number, number, number] = [0, 0, 0]
    hsl[0] = hsv[0]
    hsl[2] = hsv[2] - (hsv[2] * hsv[1] / 2)

    hsl[1] = (hsv[2] - hsl[2]) / Math.min(hsl[2], 1 - hsl[2])
    if (hsl[2] === 0 || hsl[2] === 1) hsl[1] = 0

    return hsl
}