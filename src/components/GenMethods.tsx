import { ColorContext } from '../contexts/ColorContext'
import genMethodList from '../utils/genMethodList'
import Container from './Container'
import { useContext, useState } from "react"

interface IGenMethodsProps {
    showGenMethod: boolean
    setShowGenMethod: Function
}
export default function GenMethods(props: IGenMethodsProps) {
    const colorContext = useContext(ColorContext)

    const genMethods = genMethodList.map((item) => {
        function changeMethod() {
            colorContext.setGenMethod(+genMethodList.indexOf(item) - 1)
        }
        let className = 'genmethods__button'
        if (colorContext.genMethod === genMethodList.indexOf(item) - 1) {
            className += ' genmethods__button-active'
        }
        return <button className={className} onClick={changeMethod} key={item}>{item}</button>
    })

    const [doAnimation, setDoAnimation] = useState(false)
    function HandleCloseButtonClick() {
        setDoAnimation(true)
        props.setShowGenMethod(false)
        setTimeout(() => {
            setDoAnimation((anim) => !anim)
        }, 300)
    }
    const sectionClasses = [
        'genmethods',
        'modal',
        doAnimation || props.showGenMethod ? 'modal-active' : ''
    ]
    return (
        <section className={sectionClasses.join(' ')}>
            <div className={`genmethods__wrapper modal__wrapper 
                ${props.showGenMethod ? 'modal__wrapper-active' : ''}`}>
                <Container className={`genmethods__container modal__container
                    ${props.showGenMethod ? 'modal__container-active' : ''}`}>
                    <header className="genmethods__header modal__header">
                        <button
                            className="genmethods__close-button modal__close-button"
                            onClick={HandleCloseButtonClick}>
                            <span></span><span></span>
                        </button>
                    </header>
                    <h2 className="genmethods__title modal__title">Choose generation method:</h2>
                    <section className="genmethods__section modal__section">
                        <div className="genmethods__list">
                            {genMethods}
                        </div>
                    </section>
                </Container>
            </div>
        </section>
    )
}