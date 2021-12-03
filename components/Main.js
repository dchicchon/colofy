import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { ADD_PANEL, CHANGE_PANEL, REMOVE_PANEL } from '../utils/actions'
import { useDispatchContext, useStateContext } from '../utils/ColorContext'
const ControlBoard = () => {
    const state = useStateContext()
    const dispatch = useDispatchContext();
    const [show, setShow] = useState(false)
    const boardRef = useRef(null)
    return (
        <div className={styles.controlWrapper}>
            {/* <div style={{ opacity: show ? 1 : 0 }} className={styles.controlBoard} ref={boardRef}>
          <h3 className={styles.title}>Colorfy</h3>
          <ul className={styles.controlList}>
            <li>
              <div className={styles.input}>
                <label>Add Panel</label>
                <button className='button' onClick={() => dispatch({ type: ADD_PANEL })}>+</button>
              </div>
            </li>
          </ul>
        </div> */}
            <div className={styles.tab} onClick={() => dispatch({ type: ADD_PANEL })}>+</div>
        </div>
    )
}

const Panel = ({ panel }) => {
    const dispatch = useDispatchContext()
    const [show, setShow] = useState(false)
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(panel.color)
    }
    return (
        <div
            onMouseOver={() => setShow(true)}
            onPointerLeave={() => setShow(false)}
            style={{ backgroundColor: panel.color }}
            className={styles.panel}
        >
            {/* at the bottom on hover, show the rgb and hex value? */}
            <div style={{ opacity: show ? 1 : 0 }} className={styles.infoPanel}>
                <button className='text-button' onClick={copyToClipboard}>
                    Clipboard
                </button>
                <button className='text-button' onClick={() => dispatch({ type: CHANGE_PANEL, payload: panel.id })}>Change</button>
                <button className='button' onClick={() => dispatch({ type: REMOVE_PANEL, payload: panel.id })}>x</button>
            </div>
        </div>
    )
}

const PanelBoard = () => {



    /**
     * 
     * eg 1
     * [] [] [] [] []
     * [            ]
     * 
     * eg 2
     * [ ] [ ] [  ] [  ]
     */

    const state = useStateContext()
    const [panels, setPanels] = useState([])

    useEffect(() => {
        let newPanels = displayPanels()
        setPanels(newPanels)
    }, [state])

    const displayPanels = () => {
        //get panels length;
        let panelsArr = [...state.panels]
        let index = 0;
        let row = 0;
        let completeArr = []
        let rowArr = []
        console.log("Start")
        console.log(panelsArr)
        while (panelsArr.length) {
            console.log("While Loop")
            let panel = panelsArr.shift();
            rowArr[index] = panel;
            index++
            if (index % 5 === 0 || panelsArr.length === 0) {
                row++
                index = 0;
                completeArr.push(rowArr)
                rowArr = []
            }
        }
        console.log("End")
        console.log(completeArr)
        return completeArr
    }

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
    )
}

const Messages = () => {
    const state = useStateContext();

    if (state.message) {
        return (
            <div className={styles.messages}>
                <p>You must delete a panel in order to add new ones</p>
            </div>
        )
    } else {
        return ''
    }
}

const MainApp = () => {
    const dispatch = useDispatchContext()
    useEffect(() => {
        for (let i = 0; i < 3; i++) {
            dispatch({
                type: ADD_PANEL
            })
        }
    }, [])
    return (
        <>
            <ControlBoard />
            <PanelBoard />
            <Messages />
        </>
    )
}

export default MainApp
