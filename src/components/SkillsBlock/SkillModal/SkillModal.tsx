import Backdrop from "@/components/Backdrop/Backdrop";
import styles from "./skillModal.module.scss";

interface SkillModalProps {
  children: JSX.Element | JSX.Element[];
  closeFromBackdrop: () => void;
  closeFromButton: () => void;
  modalIsShown: boolean;
  title: string;
}

export default function SkillModal({
  children,
  closeFromBackdrop,
  closeFromButton,
  modalIsShown,
  title,
}: SkillModalProps) {
  return (
    <>
      <Backdrop isShown={modalIsShown} hideBackdrop={closeFromBackdrop} />
      <div
        role="dialog"
        className={`${styles.modal} ${modalIsShown ? styles.showModal : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <span
          role="button"
          aria-description={`Close ${title} skill modal`}
          onClick={closeFromButton}
        >
          X
        </span>
        <h3>{title}</h3>
        <div className={styles.descriptionDiv}>{children}</div>
      </div>
    </>
  );
}
