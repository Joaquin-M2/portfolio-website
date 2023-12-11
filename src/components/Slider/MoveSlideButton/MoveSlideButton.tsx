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
        className={
          leftwardsArrow ? styles.LeftwardsArrow : styles.RightwardsArrow
        }
      >
        &#10148;
      </div>
    </button>
  );
}
