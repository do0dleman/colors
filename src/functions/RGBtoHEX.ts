/**
 * Converts rgb to hex
 * @param rgb color RGB value represented by an array
 * @returns color hex string value
 */


export default function RGBtoHEX(rgb: [number, number, number]): String {
    let hex = ''
    rgb.forEach((ell) => {
        let num = Math.round(ell).toString(16)
        if (num.length === 1) num = '0' + num
        hex += num
    })
    return hex.toUpperCase()
}