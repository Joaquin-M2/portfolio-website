import styles from './moveSlideButton.module.scss';

export default function MoveSlideButton(props) {
  return (
    <button
      className={`${styles.Button} ${props.additionalStyles}`}
      onClick={props.changeSlide}
    >
      <div className={styles.ButtonContentContainer}>&#10148;</div>
    </button>
  );
}
