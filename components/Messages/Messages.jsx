import React, { useEffect, useState } from 'react';
import { SET_MESSAGE } from '../../utils/actions';
import { useDispatchContext, useStateContext } from '../../utils/ColorContext';
import styles from '../../styles/Home.module.css';


export const Messages = () => {
  let timeout;
  const state = useStateContext();
  const dispatch = useDispatchContext();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (state.message === '') {
    } else {
      clearInterval(timeout);
      console.log('Change message');
      console.log(state.message);
      timeout = setTimeout(() => {
        console.log('Reset Message');
        dispatch({ type: SET_MESSAGE, payload: '' });
      }, 5000);
    }
  }, [state.message]);

  const showMessage = () => {};
  const hideMessage = () => {};

  if (state.message) {
    return (
      <div className={styles.messages}>
        <p>{state.message}</p>
      </div>
    );
  } else {
    return '';
  }
};
