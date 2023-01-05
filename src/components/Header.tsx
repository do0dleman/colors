import { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../contexts/ColorContext";
import generateColorShade from "../functions/generateColorShade";
import generateColorShades from "../functions/generateColorShades";
import HSVtoRGB from "../functions/HSVtoRGB";
import RGBtoString from "../functions/RGBtoString";
import Container from "./Container";

export default function Header() {
    const colorContext = useContext(ColorContext)
    const logo = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        logo.current!.style.color = RGBtoString(HSVtoRGB(generateColorShade(colorContext.color, 0.2, 0)))
    }, [colorContext.color])

    return (
        <header className="header">
            <Container className={'header__container'}>
                <span ref={logo} className="header__logo">Colors</span>
            </Container>
        </header>
    )
}