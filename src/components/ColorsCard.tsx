import { useEffect, useRef, useState } from "react"
import RGBtoHEX from "../functions/RGBtoHEX";
import RGBtoString from "../functions/RGBtoString";

interface IColorCardProps {
    colorRGB: [number, number, number]
    colorHSV: [number, number, number]
}

export default function ColorsCard(props: IColorCardProps) {
    const card = useRef<HTMLDivElement>(null)
    const [hex, setHex] = useState<String>(RGBtoHEX(props.colorRGB))
    const [hsv, setHsv] = useState<Array<number>>(props.colorHSV)
    const [colorName, setColorName] = useState<String>('')
    useEffect(() => {
        card.current!.style.backgroundColor = RGBtoString(props.colorRGB);
        setHex(RGBtoHEX(props.colorRGB))
        setHsv(props.colorHSV.map((item) => Math.round(item * 100) / 100))

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
            {/* <div className="colors__code-wrapper">
                <p className="colors__code">{`#${hex}`}</p>
                <p className="colors__code">{colorName}</p>
            </div> */}
            <p className="colors__code">{`#${hex}`}</p>
            <p className="colors__code">{colorName}</p>
        </div>
    )
}