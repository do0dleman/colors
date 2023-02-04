import { useContext, useEffect, useRef, useState } from "react"
import { ColorContext } from "../contexts/ColorContext"
import HSVtoRGB from "../functions/HSVtoRGB"
import RGBtoString from "../functions/RGBtoString"
import Container from "./Container"
import LockSVG from "./svgComponents/LockSVG"
import UnlockSVG from "./svgComponents/UnlockSVG"

interface IColorpickerProps {
    showColorPicker: boolean
    setShowColorPicker: Function
}
export default function Colorpicker(props: IColorpickerProps) {
    const colorContext = useContext(ColorContext)
    const hueRange = useRef<HTMLInputElement>(null)


    const [doAnimation, setDoAnimation] = useState(false)
    function HandleCloseButtonClick() {
        setDoAnimation(true)
        props.setShowColorPicker(false)
        console.log(doAnimation)
        setTimeout(() => {
            setDoAnimation((anim) => !anim)
            console.log(doAnimation)
        }, 300)
    }
    const sectionClasses = [
        'header__color-picker',
        'color-picker',
        'modal',
        doAnimation || props.showColorPicker ? 'modal-active' : ''
    ]

    function HandleLockClick() {
        if (colorContext.color[0] !== +hueRange.current!.value
            && colorContext.doNewColor === true) {
            colorContext.setColor([+hueRange.current!.value, 1, 1])
        }
        colorContext.setDoNewColor(!colorContext.doNewColor)
    }
    function HandleHueInputChange(e: React.FormEvent<HTMLInputElement>) {
        hueRange.current!.style.setProperty('--thumbColor', RGBtoString(HSVtoRGB([+e.currentTarget.value, 1, 1])))
    }
    useEffect(() => {
        hueRange.current!.value = `${colorContext.color[0]}`
        hueRange.current!.style.setProperty('--thumbColor', RGBtoString(HSVtoRGB(colorContext.color)))
    }, [colorContext.color])
    useEffect(() => {
        hueRange.current!.value = `${colorContext.color[0]}`
        hueRange.current!.style.setProperty('--thumbColor', RGBtoString(HSVtoRGB(colorContext.color)))
    }, [])
    return (
        <section className={sectionClasses.join(' ')}>
            <div className={`color-picker__wrapper modal__wrapper
                ${props.showColorPicker ? 'modal__wrapper-active' : ''}`}>
                <Container className={`color-picker__container modal__container
                    ${props.showColorPicker ? 'modal__container-active' : ''}`}>
                    <header className="color-picker__header modal__header">
                        <button
                            className="color-picker__close-button modal__close-button"
                            onClick={HandleCloseButtonClick}>
                            <span></span><span></span>
                        </button>
                    </header>
                    <section className="color-picker__section modal__section">
                        <h2 className="color-picker__title modal__title">Hue of seed color</h2>
                        <div className="color-picker__block modal__block">
                            <input type="range" name="hue"
                                className="color-picker__hue-range"
                                min={0}
                                max={0.99}
                                step={0.01}
                                ref={hueRange}
                                onChange={HandleHueInputChange} />
                            <button className="color-picker__lock"
                                onClick={HandleLockClick}>
                                {colorContext.doNewColor ? <UnlockSVG /> : <LockSVG />}
                            </button>
                        </div>
                    </section>
                </Container>
            </div>
        </section>
    )
}