import styles from './skillModal.module.scss';

export default function SkillModal(props) {
  return (
    <div
      className={`${styles.outerModal} ${
        props.showingModal ? styles.showModal : ''
      }`}
      onClick={props.closeFromOuterModal}
    >
      <div
        className={`${styles.modal} ${
          props.showingModal ? styles.showModal : ''
        }`}
        onClick={props.stopPropagation}
      >
        <span onClick={props.closeFromButton}>X</span>
        <h3>{props.title}</h3>
        <div className={styles.descriptionDiv}>{props.description}</div>
      </div>
    </div>
  );
}
