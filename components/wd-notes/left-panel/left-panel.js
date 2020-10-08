import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRef, useEffect, useState} from 'react';
import styles from './left-panel.module.scss';

export default function LeftPanel(props) {
    const router = useRouter();
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
                   className={styles.LeftPanelCheckbox} 
                   type="checkbox" 
                   id="left-panel" 
                   name="slider-left-panel" 
                   onChange={() => setButtonIsChecked(prevState => !prevState)}
            />
            <aside className={`${styles.Container} ${props.additionalStyles}`}>
                <label className={styles.LeftPanelButton} htmlFor="left-panel">
                    {/* <div className={styles.CurtainButtonContent}>Details</div> */}
                </label>
                <div className={styles.TitleContainer}>
                    <h3 className={styles.Title}>Topic</h3>
                </div>
                <ul className={styles.List}>
                    <Link href="/web-development-notes/javascript">
                        <a className={`${styles.ListElement} ${router.pathname.startsWith('/web-development-notes/javascript') ? styles.active : null}`}>
                            <li>
                                JavaScript
                            </li>
                        </a>
                    </Link>
                    <Link href="/web-development-notes/typescript">
                        <a className={`${styles.ListElement} ${router.pathname.startsWith('/web-development-notes/typescript') ? styles.active : null}`}>
                            <li>
                                TypeScript
                            </li>
                        </a>
                    </Link>
                    <Link href="/web-development-notes/react">
                        <a className={`${styles.ListElement} ${router.pathname.startsWith('/web-development-notes/react') ? styles.active : null}`}>
                            <li>
                                React
                            </li>
                        </a>
                    </Link>
                    <Link href="/web-development-notes/html">
                        <a className={`${styles.ListElement} ${router.pathname.startsWith('/web-development-notes/html') ? styles.active : null}`}>
                            <li>
                                HTML
                            </li>
                        </a>
                    </Link>
                    <Link href="/web-development-notes/css">
                        <a className={`${styles.ListElement} ${router.pathname.startsWith('/web-development-notes/css') ? styles.active : null}`}>
                            <li>
                                CSS
                            </li>
                        </a>
                    </Link>
                </ul>
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


