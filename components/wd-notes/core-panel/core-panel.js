import styles from './core-panel.module.scss';

export default function CorePanel(props) {

    return (
        <article className={`${styles.Container} ${props.additionalStyles}`}>
            {props.children}
        </article>
    )
}