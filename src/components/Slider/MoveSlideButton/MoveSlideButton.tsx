import styles from "./moveSlideButton.module.scss";

interface MoveSlideButtonProps {
  additionalStyles?: string;
  changeSlide?: () => void;
  leftwardsArrow?: boolean;
}

export default function MoveSlideButton({
  additionalStyles,
  changeSlide,
  leftwardsArrow,
}: MoveSlideButtonProps) {
  return (
    <button
      className={`${styles.Button} ${additionalStyles}`}
      onClick={changeSlide}
    >
      <div
        data-testid="moveSlideButtonDiv"
        className={
          leftwardsArrow ? styles.LeftwardsArrow : styles.RightwardsArrow
        }
      >
        {leftwardsArrow ? <>&#129092;</> : <>&#129094;</>}
      </div>
      <span className={styles.arrowText}>
        {leftwardsArrow ? "Previous" : "Next"}
      </span>
    </button>
  );
}
