import { useContext, useEffect, useRef, useState } from "react";
import { ColorContext } from "../contexts/ColorContext";
import HSVtoRGB from "../functions/HSVtoRGB";
import RGBtoString from "../functions/RGBtoString";
import Colorpicker from "./Colorpicker";
import Container from "./Container";

export default function Header() {
    const colorContext = useContext(ColorContext)
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false)

    const logo = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        logo.current!.style.color = RGBtoString(HSVtoRGB(colorContext.color))
    }, [colorContext.color])
    function HandleLogoClick() {
        setShowColorPicker(true)
    }
    return (
        <header className="header">
            <Container className={'header__container'}>
                <span
                    ref={logo}
                    onClick={HandleLogoClick}
                    className="header__logo">
                    Colors
                </span>
                <Colorpicker
                    showColorPicker={showColorPicker}
                    setShowColorPicker={setShowColorPicker} />
            </Container>
        </header>
    )
}