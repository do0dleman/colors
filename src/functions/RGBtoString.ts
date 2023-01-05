/** 
 * @param {[number, number, number]} rgb RGB value, represented by array
 * @returns {string}                     RGB string value
**/

export default function RGBtoString(rgb: [number, number, number]): string {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}