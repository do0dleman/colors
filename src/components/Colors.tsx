import { ReactNode, useContext, useEffect, useState } from "react";
import { ColorContext } from "../contexts/ColorContext";
import generateColors from "../functions/generateColors";
import HSVtoRGB from "../functions/HSVtoRGB";
import ColorsCard from "./ColorsCard";
import Container from "./Container";

export default function Colors() {
    const colorContext = useContext(ColorContext)
    const [cards, setCards] = useState<ReactNode[]>()
    const [prevColors, setPrevColors] = useState<[number, number, number][][]>([])
    const [currentPosition, setCurrentPosition] = useState<number>(-1)

    let colors: [number, number, number][];

    function HandleUndoColors() {
        if (currentPosition !== prevColors.length - 1) {
            setPrevColors((prevPrevColors) => {
                for (let i = 0; i < (prevPrevColors.length - 1 - currentPosition); i++) {
                    prevPrevColors.pop()
                }
                return prevPrevColors
            })
        }
    }
    function updateColors() {
        colors = generateColors(colorContext.color, colorContext.genMethod)
        setPrevColors((prevPrevColors) => [
            ...prevPrevColors, colors
        ])
        setCurrentPosition(currentPosition + 1)


        setCards(colors.map(item => {
            const rgb = HSVtoRGB(item)
            return (
                <ColorsCard key={`${Math.random()}`} colorRGB={rgb} colorHSV={item} />
            )
        }))
    }
    function updateColorCards() {
        HandleUndoColors()
        setTimeout(updateColors, 0)
    }
    function undoColors() {
        if (currentPosition - 1 < 0) return

        colors = prevColors[currentPosition - 1]
        if (colors === undefined) return

        setCurrentPosition(currentPosition - 1)
        setCards(colors.map(item => {
            const rgb = HSVtoRGB(item)
            return (
                <ColorsCard key={`${Math.random()}`} colorRGB={rgb} colorHSV={item} />
            )
        }))
    }
    function redoColors() {
        if (prevColors.length <= currentPosition + 1) return

        colors = prevColors[currentPosition + 1]
        if (colors === undefined) return

        setCurrentPosition(currentPosition + 1)
        setCards(colors.map(item => {
            const rgb = HSVtoRGB(item)
            return (
                <ColorsCard key={`${Math.random()}`} colorRGB={rgb} colorHSV={item} />
            )
        }))
    }
    useEffect(updateColorCards, [colorContext.color])
    useEffect(undoColors, [colorContext.doUndo])
    useEffect(redoColors, [colorContext.doRedo])

    return (
        <section className="colors">
            <Container className={'colors__container'}>
                {cards}
            </Container>
        </section>
    )
}

