import { useContext, useEffect, useRef, useState } from "react"
import HSVtoHSL from "../functions/HSVtoHSL";
import RGBtoHEX from "../functions/RGBtoHEX";
import RGBtoString from "../functions/RGBtoString";
import copy from "copy-to-clipboard";
import UnlockSVG from "./svgComponents/UnlockSVG";
import LockSVG from "./svgComponents/LockSVG";
import { ColorContext } from "../contexts/ColorContext";

interface IColorCardProps {
    colorRGB: [number, number, number]
    colorHSV: [number, number, number]
    id: number
}

export default function ColorsCard(props: IColorCardProps) {
    const colorContext = useContext(ColorContext)
    const card = useRef<HTMLDivElement>(null)
    const [hex, setHex] = useState<String>(RGBtoHEX(props.colorRGB))
    const [colorName, setColorName] = useState<String>('')
    const [showHexNot, setShowHexNot] = useState<boolean>(false)
    const [isLocked, setIsLocked] = useState<Boolean>(colorContext.lockedColors.includes(props.colorHSV))
    const [colorsTextClasses, setColorsTextClasses] = useState<string>('colors__code')
    const [lockClasses, setLockClasses] = useState<String[]>(['colors__lock', 'svg-button'])

    useEffect(() => {
        card.current!.style.backgroundColor = RGBtoString(props.colorRGB);
        setHex(RGBtoHEX(props.colorRGB))
        const hsl: [number, number, number] = HSVtoHSL(props.colorHSV)
        if (hsl[2] < 0.45) {
            setColorsTextClasses('colors__code')
            setLockClasses(['colors__lock', 'svg-button', 'colors__lock-white'])
        } else {
            setColorsTextClasses('colors__code colors__code-black')
            setLockClasses(['colors__lock', 'svg-button'])
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
    function HandleLockClick() {
        setIsLocked(!isLocked)
        if (!colorContext.lockedColors.includes(props.colorHSV)) {
            colorContext.setLockedColors((prev: ([number, number, number] | null)[]) => {
                prev[props.id] = props.colorHSV
                return prev
            })
        } else {
            colorContext.setLockedColors((prev: ([number, number, number] | null)[]) => {
                const index = prev.indexOf(props.colorHSV)
                prev[index] = null
                return prev
            })
        }
    }
    return (
        <div ref={card} className="colors__card">
            <button className={lockClasses.join(' ')}
                onClick={HandleLockClick}>
                {isLocked ? <LockSVG /> : <UnlockSVG />}
            </button>
            <div className="colors__info">
                <p className={colorsTextClasses} onClick={copyHexToClipboard}>{`#${hex}`}</p>
                <p className={colorsTextClasses}>{colorName}</p>
            </div>
            <div className={
                `colors__hex-notification ${showHexNot ?
                    'colors__hex-notification-active' : 'colors__hex-notification-inactive'}`
            }
            >
                {`#${hex} has been copied`}
            </div>
        </div >
    )
}