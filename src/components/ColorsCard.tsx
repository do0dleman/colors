import { useEffect, useRef, useState } from "react"
import RGBtoHEX from "../functions/RGBtoHEX";
import RGBtoString from "../functions/RGBtoString";

interface IColorCardProps {
    colorRGB: [number, number, number]
    colorHSV: [number, number, number]
}

export default function ColorsCard(props: IColorCardProps) {
    const card = useRef<HTMLDivElement>(null)
    const [hex, setHex] = useState<String>('#000000')
    const [hsv, setHsv] = useState<Array<number>>([0, 0, 0])
    useEffect(() => {
        card.current!.style.backgroundColor = RGBtoString(props.colorRGB);
        setHex(RGBtoHEX(props.colorRGB))
        setHsv(props.colorHSV.map((item) => Math.round(item * 1000) / 1000))
    }, [])
    return (
        <div ref={card} className="colors__card">
            <span className="colors__code">{`#${hex}`}</span>
            <span className="colors__code">{`hsv(${hsv[0]}, ${hsv[1]}, ${hsv[2]})`}</span>
        </div>
    )
}