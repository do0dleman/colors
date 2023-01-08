export default function shuffleArray(arr: number[]) {
    let temp
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.round(Math.random() * (i - 1))
        temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
    return arr
}