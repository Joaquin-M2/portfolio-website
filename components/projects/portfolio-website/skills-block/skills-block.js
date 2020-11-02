import styles from './skills-block.module.scss';

export default function SkillsBlock(props) {
    return (
        <div className={`${styles.Container} ${props.additionalStyles}`}>
            {props.children}
        </div>
    )
}