import { ADD_PANEL, CHANGE_PANEL, REMOVE_PANEL } from "./actions";
import { v4 as uuid } from 'uuid'

export const getRandomColor = () => Math.floor(Math.random() * 255)

export const createPanel = () => {
    let r = getRandomColor();
    let g = getRandomColor();
    let b = getRandomColor();
    return {
        id: uuid(),
        color: `rgb(${r},${g},${b})`
    }
}

export function reducer(state, action) {
    switch (action.type) {
        case ADD_PANEL: {
            if (state.panels.length === 25) {
                return {
                    ...state,
                    message: 'You must delete a panel in order to add new ones'
                }
            }
            let newPanel = createPanel()
            return {
                ...state,
                panels: [...state.panels, newPanel]
            }
        }
        case REMOVE_PANEL: {
            let panelList = state.panels.filter((panel) => panel.id !== action.payload)
            return {
                ...state,
                message: false,
                panels: panelList
            }
        }
        case CHANGE_PANEL: {
            let panelList = [...state.panels]
            const newPanel = createPanel()
            for (let index = 0; index < panelList.length; index++) {
                if (panelList[index].id === action.payload) {
                    panelList[index] = newPanel
                    break;
                }
            }
            return {
                ...state,
                panels: panelList
            }
        }
        default: {
            return state
        }

    }
}