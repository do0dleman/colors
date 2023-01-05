import React, { useRef, useState } from 'react';
import Colors from './components/Colors';
import Container from './components/Container';
import Header from './components/Header';
import { ColorContext } from './contexts/ColorContext';

function App() {
  const container = useRef<HTMLDivElement>(null)
  const [color, setColor] = useState<[number, number, number]>([Math.random(), 1, 1,])
  return (

    <div className="app">
      <Container innerRef={container} className='app__container'>
        <ColorContext.Provider value={{ color, setColor }}>
          <Header></Header>
          <Colors></Colors>
        </ColorContext.Provider>
      </Container>
    </div>
  );
}
export default App;
