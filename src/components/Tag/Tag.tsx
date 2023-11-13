import styles from "./tag.module.scss";

interface TagProps {
  children: string;
  isFilterButton?: Boolean;
  handleRemoveFilterTag?: React.MouseEventHandler<HTMLButtonElement>;
}

function Tag({ children, isFilterButton, handleRemoveFilterTag }: TagProps) {
  return (
    <>
      {isFilterButton ? (
        <button
          className={styles.tagButton}
          type="button"
          onClick={handleRemoveFilterTag}
        >
          {children}
        </button>
      ) : (
        <span className={styles.tag}>{children}</span>
      )}
    </>
  );
}
export default Tag;
