import React from 'react';
import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import {Button} from "@nextui-org/button";


function App() {
  return (
    <NextUIProvider>
      <h1 className='p-20'>Hello World</h1>
      <Button>Press me</Button>
    </NextUIProvider>
  );
}

export default App;
