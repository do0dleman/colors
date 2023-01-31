import { ColorContext } from "../contexts/ColorContext";
import { useContext, useEffect, useRef, useState } from "react"
import Container from "./Container";
import UndoSVG from "./svgComponents/UndoSVG";
import RedoSVG from "./svgComponents/RedoSVG";
import GenSVG from "./svgComponents/GenSVG";
import GenMethods from "./GenMethods";

export default function Controls() {
    const colorContext = useContext(ColorContext)

    const [showGenMethod, setShowGenMethod] = useState(false)

    const generateButton = useRef<HTMLButtonElement>(null);
    const genButtonClasses = [
        'controls__svg-button',
        'controls__gear-button',
        showGenMethod ? 'controls__gear-button-active' : ''
    ].join(' ')

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
    function HandleGenMethodClick() {
        setShowGenMethod(!showGenMethod)
    }
    return (
        <section className="controls">
            <Container className={`controls__container`}>
                <div className="controls__button-section">
                    <button className="controls__svg-button controls__undo" onClick={HandleUndoClick}>
                        <UndoSVG />
                    </button>
                    <button className="controls__svg-button controls__redo" onClick={HandleRedoClick}>
                        <RedoSVG />
                    </button>
                </div>
                <div className="controls__button-section">
                    <button
                        className={genButtonClasses}
                        onClick={HandleGenMethodClick}>
                        <GenSVG></GenSVG>
                    </button>
                    <GenMethods setShowGenMethod={setShowGenMethod} showGenMethod={showGenMethod} />
                </div>
                <div className="controls__button-section">
                    <button
                        className="controls__button controls__generate-button"
                        ref={generateButton}
                        onClick={HandleButtonClick}
                    ><span>Generate</span>
                    </button>
                    <div className="controls__button-hint">press space to generate colors</div>
                </div>
            </Container>
        </section>
    )
}