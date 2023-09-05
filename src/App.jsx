// Be able to create color templates with panels
import React from 'react';
import { ColorProvider } from '../utils/ColorContext';
import { PanelBoard } from '../components/PanelBoard/PanelBoard';
import { Messages } from '../components/Messages/Messages';
import { ControlBoard } from '../components/ControlBoard/ControlBoard';

// create a font selector with colors

const App = () => {
  return (
    <ColorProvider>
      <PanelBoard />
      <Messages />
      <ControlBoard />
    </ColorProvider>
  );
};

export default App;
