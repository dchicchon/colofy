import React, { useContext, createContext, useReducer } from 'react';
import { getRandomColor, reducer } from './reducer';
import { v4 as uuid } from 'uuid';

const StateContext = createContext();
const DispatchContext = createContext();

export const useStateContext = () => useContext(StateContext);
export const useDispatchContext = () => useContext(DispatchContext);

// get panels from local storage. if they dont exist, create a new set

const createInitialPanels = () => {
  const newPanels = [
    { id: uuid(), color: getRandomColor() },
    { id: uuid(), color: getRandomColor() },
    { id: uuid(), color: getRandomColor() },
  ];

  // save this to local storage
  localStorage.setItem('panels', JSON.stringify(newPanels));

  return newPanels;
};

let initialPanels;
const foundPanels = localStorage.getItem('panels');
if (foundPanels) {
  initialPanels = JSON.parse(foundPanels);
} else {
  initialPanels = createInitialPanels();
}

// get color from localstorage
const initialState = {
  panels: initialPanels,
  // sets? you can save different sets of colors with a name for the set
  // current wording for the text testing page
  message: '',
};

export const ColorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
