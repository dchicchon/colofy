import React, { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';
import { CHANGE_PANEL, REMOVE_PANEL, UPDATE_PANEL } from '../../utils/actions';
import { useDispatchContext, useStateContext } from '../../utils/ColorContext';
import {
  //    SketchPicker,
  ChromePicker,
} from 'react-color';

const Panel = ({ panel }) => {
  const dispatch = useDispatchContext();
  const [showMenu, setShowMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(panel.color);
  };
  //   handle the panel getting changed
  const handleColorChange = (id, color) => {
    dispatch({
      type: UPDATE_PANEL,
      payload: {
        id,
        color,
      },
    });
  };
  return (
    <div
      onMouseOver={() => setShowMenu(true)}
      onPointerLeave={() => {
        setShowMenu(false);
        setShowColorPicker(false);
      }}
      style={{ backgroundColor: panel.color }}
      className={styles.panel}
    >
      {/* at the bottom on hover, show the rgb and hex value? */}
      <div style={{ opacity: showMenu ? 1 : 0 }} className={styles.infoPanel}>
        {/* change the color of the panel here */}
        <ChromePicker
          color={panel.color}
          onChange={(color) => handleColorChange(panel.id, color)}
        />
        {/* <button className="text-button" onClick={copyToClipboard}>
          Clipboard
        </button>
        <button
          className="text-button"
          onClick={() => dispatch({ type: CHANGE_PANEL, payload: panel.id })}
        >
          Randomize Color
        </button>

        <button
          className="text-button"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          Change Color
        </button>
        {showColorPicker && (
         
        )}
        <button
          className="button"
          onClick={() => dispatch({ type: REMOVE_PANEL, payload: panel.id })}
        >
          x
        </button> */}
      </div>
    </div>
  );
};

export const PanelBoard = () => {
  const state = useStateContext();
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    let newPanels = displayPanels();
    setPanels(newPanels);
  }, [state]);

  const displayPanels = () => {
    //get panels length;
    let panelsArr = [...state.panels];
    let index = 0;
    let completeArr = [];
    let rowArr = [];
    while (panelsArr.length) {
      let panel = panelsArr.shift();
      rowArr[index] = panel;
      index++;
      if (index % 5 === 0 || panelsArr.length === 0) {
        index = 0;
        completeArr.push(rowArr);
        rowArr = [];
      }
    }
    return completeArr;
  };

  return (
    <div className={styles.container}>
      {panels.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((panel, i) => (
            <Panel key={i} panel={panel} />
          ))}
        </div>
      ))}
    </div>
  );
};
