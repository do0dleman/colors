import React, { useRef, useState } from 'react';
import Colors from './components/Colors';
import Container from './components/Container';
import Controls from './components/Controls';
import Header from './components/Header';
import { ColorContext } from './contexts/ColorContext';

function App() {
  const container = useRef<HTMLDivElement>(null)
  const [color, setColor] = useState<[number, number, number]>([Math.random(), 1, 1,])
  const [doUndo, setDoUndo] = useState<boolean>(false)
  const [doRedo, setDoRedo] = useState<boolean>(false)

  return (

    <div className="app">
      <Container innerRef={container} className='app__container'>
        <ColorContext.Provider value={
          {
            color,
            setColor,
            doUndo,
            setDoUndo,
            doRedo,
            setDoRedo
          }}>
          <Header></Header>
          <div className="color-controls__wrapper">
            <Controls></Controls>
            <Colors></Colors>
          </div>
        </ColorContext.Provider>
      </Container>
    </div>
  );
}
export default App;
