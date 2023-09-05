import {
  ADD_PANEL,
  CHANGE_PANEL,
  REMOVE_PANEL,
  SET_MESSAGE,
  UPDATE_PANEL,
} from './actions';
import { v4 as uuid } from 'uuid';

const getRandomNumber = () => Math.floor(Math.random() * 255);
const getColor = (r, g, b) => `rgb(${r},${g},${b})`;
export const getRandomColor = () => {
  const r = getRandomNumber();
  const g = getRandomNumber();
  const b = getRandomNumber();
  return getColor(r, g, b);
};

export const createPanel = () => {
  return {
    id: uuid(),
    color: getRandomColor(),
  };
};

const savePanels = (panels) => {
  if (panels.length) {
    localStorage.setItem('panels', JSON.stringify(panels));
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case ADD_PANEL: {
      if (state.panels.length === 25) {
        return {
          ...state,
          message: 'You must delete a panel in order to add new ones',
        };
      }
      let newPanel = createPanel();
      savePanels([...state.panels, newPanel]);
      return {
        ...state,
        message: 'Panel added',
        panels: [...state.panels, newPanel],
      };
    }
    case REMOVE_PANEL: {
      let panelList;
      let id = action.payload;
      if (!id) {
        id = state.panels[state.panels.length - 1].id;
      }
      panelList = state.panels.filter((panel) => panel.id !== id);
      savePanels(panelList);
      return {
        ...state,
        message: false,
        panels: panelList,
      };
    }
    case UPDATE_PANEL: {
      console.log('updatepanel');
      console.log(action.payload);
      const panelsList = state.panels.map((panel) => {
        if (panel.id === action.payload.id) {
          return {
            id: panel.id,
            color: action.payload.color.hex,
          };
        }
        return panel;
      });
      savePanels(panelsList);
      return {
        ...state,
        panels: panelsList,
      };
    }
    case CHANGE_PANEL: {
      let panelList = [...state.panels];
      const newPanel = createPanel();
      for (let index = 0; index < panelList.length; index++) {
        if (panelList[index].id === action.payload) {
          panelList[index] = newPanel;
          break;
        }
      }
      savePanels(panelList);
      return {
        ...state,
        panels: panelList,
      };
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
