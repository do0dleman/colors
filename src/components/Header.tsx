import { useContext, useEffect, useRef } from "react";
import { ColorContext } from "../contexts/ColorContext";
import generateColorShades from "../functions/generateColorShades";
import HSVtoRGB from "../functions/HSVtoRGB";
import RGBtoString from "../functions/RGBtoString";
import Container from "./Container";

export default function Header() {
    const colorContext = useContext(ColorContext)
    const logo = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        logo.current!.style.color = RGBtoString(HSVtoRGB(colorContext.color))
    }, [colorContext.color])

    function HandleButtonClick() {
        colorContext.setColor([Math.random(), 1, 1])
    }
    return (
        <header className="header">
            <Container className={'header__container'}>
                <span ref={logo} className="header__logo">Colors</span>
                <section className="header__button-section">
                    <button
                        className="header__button"
                        onClick={HandleButtonClick}
                    >Generate colors
                    </button>
                    <div className="header__button-hint">press space to generate colors</div>
                </section>
            </Container>
        </header>
    )
}