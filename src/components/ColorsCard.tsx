import { useEffect, useRef, useState } from "react"
import HSVtoHSL from "../functions/HSVtoHSL";
import RGBtoHEX from "../functions/RGBtoHEX";
import RGBtoString from "../functions/RGBtoString";

interface IColorCardProps {
    colorRGB: [number, number, number]
    colorHSV: [number, number, number]
}

export default function ColorsCard(props: IColorCardProps) {
    const card = useRef<HTMLDivElement>(null)
    const [hex, setHex] = useState<String>(RGBtoHEX(props.colorRGB))
    const [colorName, setColorName] = useState<String>('')
    const [colorsText, setColorsText] = useState<string>('colors__code')

    useEffect(() => {
        card.current!.style.backgroundColor = RGBtoString(props.colorRGB);
        setHex(RGBtoHEX(props.colorRGB))
        const hsl: [number, number, number] = HSVtoHSL(props.colorHSV)
        if (hsl[2] < 0.45) {
            setColorsText('colors__code')
        } else {
            setColorsText('colors__code colors__code-black')
        }

        fetch(`https://api.color.pizza/v1/?values=${hex}`)
            .then((res) => {
                if (!res.ok) {
                    return 'errror'
                }
                return res.json()
            })
            .then((data) => {
                setColorName(data.paletteTitle)
            })
    }, [])
    return (
        <div ref={card} className="colors__card">
            <p className={colorsText}>{`#${hex}`}</p>
            <p className={colorsText}>{colorName}</p>
            {/* <p className={colorsText}>{`hsv(${Math.round(props.colorHSV[0] * 100) / 100}, 
            ${Math.round(props.colorHSV[1] * 100) / 100}, 
            ${Math.round(props.colorHSV[2] * 100) / 100})`}</p> */}
        </div>
    )
}