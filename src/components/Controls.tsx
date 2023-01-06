import { ColorContext } from "../contexts/ColorContext";
import { useContext } from "react"
import Container from "./Container";

export default function Controls() {
    const colorContext = useContext(ColorContext)

    function HandleButtonClick() {
        colorContext.setColor([Math.random(), 1, 1])
    }
    function HandleUndoClick() {
        colorContext.setDoUndo(!colorContext.doUndo)
    }
    function HandleRedoClick() {
        colorContext.setDoRedo(!colorContext.doRedo)
    }
    return (
        <section className="controls">
            <Container className={`controls__container`}>
                <button className="controls__button controls__undo" onClick={HandleUndoClick}>undo</button>
                <button className="controls__button controls__redo" onClick={HandleRedoClick}>redo</button>
                <div className="controls__button-section">
                    <button
                        className="controls__button controls__generate-button"
                        onClick={HandleButtonClick}
                    >Generate
                    </button>
                    <div className="controls__button-hint">press space to generate colors</div>
                </div>
            </Container>
        </section>
    )
}