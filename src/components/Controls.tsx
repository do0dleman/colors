import { ColorContext } from "../contexts/ColorContext";
import { useContext } from "react"
import Container from "./Container";

export default function Controls() {
    const colorContext = useContext(ColorContext)

    function HandleButtonClick() {
        colorContext.setColor([Math.random(), 1, 1])
    }
    return (
        <section className="controls">
            <Container className={`controls__container`}>
                <div className="controls__button-section">
                    <button
                        className="controls__button"
                        onClick={HandleButtonClick}
                    >Generate
                    </button>
                    <div className="controls__button-hint">press space to generate colors</div>
                </div>
            </Container>
        </section>
    )
}