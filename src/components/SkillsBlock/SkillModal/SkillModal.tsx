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
    <div
      className={`${styles.backdrop} ${modalIsShown ? styles.showModal : ""}`}
      onClick={closeFromBackdrop}
    >
      <div
        className={`${styles.modal} ${modalIsShown ? styles.showModal : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <span onClick={closeFromButton}>X</span>
        <h3>{title}</h3>
        <div className={styles.descriptionDiv}>{children}</div>
      </div>
    </div>
  );
}
