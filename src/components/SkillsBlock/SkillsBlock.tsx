import styles from './skillsBlock.module.scss';

export default function SkillsBlock(props) {
  return (
    <div className={`${styles.Container} ${props.additionalStyles}`}>
      {props.children}
    </div>
  );
}
