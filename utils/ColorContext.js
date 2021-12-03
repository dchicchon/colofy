import React, { useContext, createContext, useReducer, useEffect } from 'react';
import { createPanel, getRandomColor, reducer } from './reducer';

const StateContext = createContext();
const DispatchContext = createContext();

export const useStateContext = () => useContext(StateContext)
export const useDispatchContext = () => useContext(DispatchContext)

const initialState = {
    r: getRandomColor(),
    g: getRandomColor(),
    b: getRandomColor(),
    panels: [],
    message: ''
}

export const ColorProvider = ({ children }) => {

    useEffect(() => {
    }, [])

    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}
