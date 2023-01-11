import { ColorContext } from "../contexts/ColorContext";
import { useContext, useEffect } from "react"
import Container from "./Container";
import undoSVG from "../svgs/undo-svgrepo-com.svg"
import redoSVG from "../svgs/redo-svgrepo-com.svg"
import UndoSVG from "./svgComponents/UndoSVG";
import RedoSVG from "./svgComponents/RedoSVG";
import LockSVG from "./svgComponents/LockSVG";

export default function Controls() {
    const colorContext = useContext(ColorContext)


    function HandleButtonClick() {
        if (!colorContext.doNewColor) {
            colorContext.setColor([colorContext.color[0] + Math.random() / 10000, 1, 1])
            return
        }
        colorContext.setColor([Math.random(), 1, 1])
    }
    function HandleKeyDown(e: any): void {
        if (e.key === ' ') HandleButtonClick()
    }
    useEffect(() => {
        document.body.addEventListener('keyup', HandleKeyDown)
        return () => {
            document.body.removeEventListener('keyup', HandleKeyDown)
        }
    }, [colorContext.doNewColor])

    function HandleUndoClick() {
        colorContext.setDoUndo(!colorContext.doUndo)
    }
    function HandleRedoClick() {
        colorContext.setDoRedo(!colorContext.doRedo)
    }
    return (
        <section className="controls">
            <Container className={`controls__container`}>
                <div className="controls__button-section">
                    <button className="controls__svg-button controls__undo" onClick={HandleUndoClick}>
                        {/* <img src={undoSVG} alt="undoSVG" /> */}
                        <UndoSVG />
                    </button>
                    <button className="controls__svg-button controls__redo" onClick={HandleRedoClick}>
                        <RedoSVG />
                    </button>
                </div>
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