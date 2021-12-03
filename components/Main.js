import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { ADD_PANEL, CHANGE_PANEL, REMOVE_PANEL } from '../utils/actions'
import { useDispatchContext, useStateContext } from '../utils/ColorContext'

const ToolTip = (props) => {
    let timeout;
    let [active, setActive] = useState(false)

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true)
        }, 500)
    }

    const hideTip = () => {
        clearInterval(timeout)
        setActive(false)
    }

    return (
        <div onMouseOver={showTip} onMouseLeave={hideTip} className={styles.tooltipWrapper}>
            {props.children}
            {active && (
                <div className={styles.tooltip}>
                    {props.text}
                </div>
            )}
        </div>
    )
}

const ControlBoard = () => {
    const state = useStateContext()
    const dispatch = useDispatchContext();
    const copyEntirePalette = () => {
        let text = ''
        for (let panel of state.panels) {
            text += `${panel.color},`
        }
        navigator.clipboard.writeText(text)
    }

    return (
        <div className={styles.controlWrapper}>
            <FloatingButton action={() => dispatch({ type: ADD_PANEL })} label='Add Panel' symbol="+" />
            <FloatingButton action={copyEntirePalette} label='Copy Entire Palette' symbol="&#128203;" />
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
        let completeArr = []
        let rowArr = []
        while (panelsArr.length) {
            let panel = panelsArr.shift();
            rowArr[index] = panel;
            index++
            if (index % 5 === 0 || panelsArr.length === 0) {
                index = 0;
                completeArr.push(rowArr)
                rowArr = []
            }
        }
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
                <p>{state.message}</p>
            </div>
        )
    } else {
        return ''
    }
}

const FloatingButton = ({ action, label, symbol }) => {
    return (
        <div className={styles.floatingButtonWrapper}>
            <ToolTip text={label}>
                <div onClick={action} className={styles.floatingButton}>
                    {symbol}
                </div>
            </ToolTip>
        </div>
    )
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
