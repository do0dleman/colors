import { KeyboardEvent, ReactNode, useContext, useEffect, useState } from "react";
import { ColorContext } from "../contexts/ColorContext";
import generateAnalogColors from "../functions/generateAnalogColors";
import generateColors from "../functions/generateColors";
import generateColorShade from "../functions/generateColorShade";
import generateColorShades from "../functions/generateColorShades";
import generateTetrColors from "../functions/generateTetrColors";
import HSVtoRGB from "../functions/HSVtoRGB";
import RGBtoString from "../functions/RGBtoString";
import ColorsCard from "./ColorsCard";
import Container from "./Container";

export default function Colors() {
    const colorContext = useContext(ColorContext)
    const [cards, setCards] = useState<ReactNode[]>()

    let colors: [number, number, number][] = generateColorShades([0, 0, 0], 0.15)

    function HandleKeyDown(e: any): void {
        if (e.key === ' ') colorContext.setColor([Math.random(), 1, 1])
    }
    useEffect(() => {
        document.body.addEventListener('keyup', e => HandleKeyDown(e))
    }, [])

    function updateColorCards() {
        colors = generateColors(colorContext.color)

        setCards(colors.map(item => {
            const rgb = HSVtoRGB(item)
            return (
                <ColorsCard key={`${Math.random()}`} colorRGB={rgb} colorHSV={item} />
            )
        }))
    }
    useEffect(updateColorCards, [colorContext.color])

    return (
        <section className="colors">
            <Container className={'colors__container'}>
                {cards}
            </Container>
        </section>
    )
}

