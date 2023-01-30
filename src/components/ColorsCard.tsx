import { useEffect, useRef, useState } from "react"
import HSVtoHSL from "../functions/HSVtoHSL";
import RGBtoHEX from "../functions/RGBtoHEX";
import RGBtoString from "../functions/RGBtoString";
import copy from "copy-to-clipboard";

interface IColorCardProps {
    colorRGB: [number, number, number]
    colorHSV: [number, number, number]
}

export default function ColorsCard(props: IColorCardProps) {
    const card = useRef<HTMLDivElement>(null)
    const [hex, setHex] = useState<String>(RGBtoHEX(props.colorRGB))
    const [colorName, setColorName] = useState<String>('')
    const [colorsText, setColorsText] = useState<string>('colors__code')
    const [showHexNot, setShowHexNot] = useState<boolean>(false)

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

    function copyHexToClipboard() {
        copy(`#${hex}`)
        setShowHexNot(true)
        setTimeout(() => {
            setShowHexNot(false)
        }, 2500)
    }
    return (
        <div ref={card} className="colors__card">
            <div className="colors__info">
                <p className={colorsText} onClick={copyHexToClipboard}>{`#${hex}`}</p>
                <p className={colorsText}>{colorName}</p>
            </div>
            <div className={
                `colors__hex-notification ${showHexNot ?
                    'colors__hex-notification-active' : 'colors__hex-notification-inactive'}`
            }
            >{`#${hex} has been copied`}</div>
        </div>
    )
}