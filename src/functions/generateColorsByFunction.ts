import generateColorShade from "./generateColorShade"

/**
 * Creates colors of different shades based on colors from generation function
 * @param hsv HSV color value repesented by an array
 * @param colorGenFunction function to generate "parent" colors
 * @param step step used in generation function
 * @param doSortByHue if true colors will be sorted by their hue value
 * @returns 5 generated colors
 */

export default function generateColorsByFunction(hsv: [number, number, number], colorGenFunction: Function, step: number, doSortByHue: boolean = false) {
    let colors: [number, number, number][] = colorGenFunction(hsv, step)
    colors = [
        generateColorShade(colors[0], (Math.random() + 6.5) / 10, 0),
        generateColorShade(colors[1], (Math.random() + 3) / 10, 0),
        generateColorShade(colors[2], Math.random() / 10, 0),
        generateColorShade(colors[3], (Math.random() + 3.5) / 10, 1),
        generateColorShade(colors[4], (Math.random() + 7.75) / 10, 1),
    ]
    if (doSortByHue) {
        colors.sort((a, b) => {
            return b[0] - a[0]
        })
    }
    return colors
}