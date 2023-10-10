import styles from './tag.module.scss';

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
          type='button'
          onClick={handleRemoveFilterTag}
        >
          {children}
        </button>
      ) : (
        <div className={styles.tag}>{children}</div>
      )}
    </>
  );
}
export default Tag;
