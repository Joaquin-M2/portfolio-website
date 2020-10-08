import styles from './header-credits.module.scss';

export default function HeaderCredits(props) {
    return (
        <header className={styles.HeaderCredits}>
            <input className={styles.HeaderCredits_Checkbox} type="checkbox" id="HeaderCredits" name="header-credits" />
            <label className={styles.HeaderCredits_Button} htmlFor="HeaderCredits">
                <div className={styles.HeaderCredits_ButtonContent}>Credits</div>
            </label>
            <div className={styles.HeaderCredits_Curtain}>
                {props.children}
            </div>
        </header>
    )
}