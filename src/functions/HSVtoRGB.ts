/** 
 * Converts hsv color value to rgb color value
 * @param {[number, number, number]} hsv HSV color value, where hue is normalized
 * @param {boolean} normalizeRGB         if true returns normalized rgb value
 * @returns {[number, number, number]}   RGB color value
**/

export default function HSVtoRGB(hsv: [number, number, number], normalizeRGB: boolean = false): [number, number, number] {
    const rgb: [number, number, number] = [0, 0, 0,]
    const max = hsv[2]
    const min = max * (1 - hsv[1])
    const c = (hsv[0] * 6 % 1) / 6
    const k = 6 * (max - min) // from formula y = kc + b where b = min or y = -kc + b where b = max
    if (hsv[0] * 6 < 1 || hsv[0] === 1) {
        rgb[0] = max
        rgb[1] = k * c + min
        rgb[2] = min
    } else if (hsv[0] * 6 < 2) {
        rgb[0] = -k * c + max
        rgb[1] = max
        rgb[2] = min
    } else if (hsv[0] * 6 < 3) {
        rgb[0] = min
        rgb[1] = max
        rgb[2] = k * c + min
    } else if (hsv[0] * 6 < 4) {
        rgb[0] = min
        rgb[1] = -k * c + max
        rgb[2] = max
    } else if (hsv[0] * 6 < 5) {
        rgb[0] = k * c + min
        rgb[1] = min
        rgb[2] = max
    } else if (hsv[0] * 6 < 6) {
        rgb[0] = max
        rgb[1] = min
        rgb[2] = -k * c + max
    }
    if (!normalizeRGB) {
        rgb.forEach((ell, index) => {
            rgb[index] = ell * 255
        })
    }
    return rgb
}