import styles from './right-panel.module.scss';
//import {useRouter} from 'next/router';
import {useRef, useEffect, useState} from 'react';

export default function RightPanel(props) {
    const toggleButton = useRef();
    const blackSail = useRef();
    const [buttonIsChecked, setButtonIsChecked] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 800) {
            toggleButton.current.checked = true;
        }
    }, [])

    useEffect(() => {
        if (window.innerWidth <= 800 && toggleButton.current.checked === false) {
            blackSail.current.style.display = 'block';
        } else {
            blackSail.current.style.display = 'none';
        }
    }, [buttonIsChecked])

    return(
        <>
            <input ref={toggleButton} 
                   className={styles.RightPanelCheckbox} 
                   type="checkbox" 
                   id="right-panel" 
                   name="slider-right-panel" 
                   onChange={() => setButtonIsChecked(prevState => !prevState)}
            />
            <aside className={`${styles.Container} ${props.additionalStyles}`}>
                <label className={styles.RightPanelButton} htmlFor="right-panel">
                    {/* <div className={styles.CurtainButtonContent}>Details</div> */}
                </label>
                <div className={styles.innerContainer}>
                <div className={styles.TitleContainer}>
                    <h3 className={styles.Title}>Index</h3>
                </div>
                <div className={styles.IndexContainer}>
                    {props.children}
                    {/* {indexContent()} */}
                </div>
                </div>
            </aside>
            <div ref={blackSail} 
                 className={styles.blackSail} 
                 onClick={() => {
                     toggleButton.current.checked = true
                     setButtonIsChecked(prevState => !prevState)
                 }}>
            </div>
        </>
    )
}

