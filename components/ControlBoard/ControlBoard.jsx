import React, { useState } from 'react';
import styles from '../../styles/Home.module.css';
import { ADD_PANEL, REMOVE_PANEL, SET_MESSAGE } from '../../utils/actions';
import { useDispatchContext, useStateContext } from '../../utils/ColorContext';

// Should show the hex and rgb value of the color
// should allow you to change the color of the panel
const ToolTip = (props) => {
  let timeout;
  let [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div onMouseEnter={showTip} onMouseLeave={hideTip} className={styles.tooltipWrapper}>
      {props.children}
      {active && <div className={styles.tooltip}>{props.text}</div>}
    </div>
  );
};

const FloatingButton = ({ action, label, symbol }) => {
  return (
    <div className={styles.floatingButtonWrapper}>
      <ToolTip text={label}>
        <div
          onClick={() => {
            console.log('clicked on button');
            action();
          }}
          className={styles.floatingButton}
        >
          {symbol}
        </div>
      </ToolTip>
    </div>
  );
};

export const ControlBoard = () => {
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const copyEntirePalette = () => {
    let text = '';
    for (let panel of state.panels) {
      text += `${panel.color},`;
    }
    navigator.clipboard.writeText(text);
    dispatch({
      type: SET_MESSAGE,
      payload: 'Palette Copied to clipboard',
    });
  };
  return (
    <div className={styles.controlWrapper}>
      <FloatingButton
        action={() => dispatch({ type: ADD_PANEL })}
        label="Add Panel"
        symbol="+"
      />
      <FloatingButton
        action={() => dispatch({ type: REMOVE_PANEL })}
        label="Remove Panel"
        symbol="-"
      />
      <FloatingButton
        action={copyEntirePalette}
        label="Copy Entire Palette"
        symbol="&#128203;"
      />
    </div>
  );
};
