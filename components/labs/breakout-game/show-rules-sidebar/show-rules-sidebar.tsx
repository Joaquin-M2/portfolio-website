import { useRef } from 'react';
import styles from './show-rules-sidebar.module.scss';

interface ShowRulesSidebarProps {
  additionalStyles?: string;
}

const ShowRulesSidebar: React.FC<ShowRulesSidebarProps> = props => {
  const toggleButton = useRef<HTMLInputElement>();
  const blackSail = useRef<HTMLDivElement>();

  return (
    <>
      <input
        ref={toggleButton}
        className={styles.LeftPanelCheckbox}
        type="checkbox"
        id="left-panel"
        name="slider-left-panel"
      />
      <aside className={`${styles.Container} ${props.additionalStyles}`}>
        <label className={styles.LeftPanelButton} htmlFor="left-panel"></label>
        <div className={styles.TitleContainer}>
          <h3 className={styles.Title}>How to play:</h3>
        </div>
        <p className={styles.Text}>
          Use your right and left keys to move the paddle, so you can bounce the
          ball up and break the bricks.
        </p>
        <p className={styles.Text}>
          If you miss the ball, both your score and bricks will reset.
        </p>
      </aside>
      <div
        ref={blackSail}
        className={styles.blackSail}
        onClick={() => {
          toggleButton.current.checked = true;
        }}
      ></div>
    </>
  );
};

export default ShowRulesSidebar;
