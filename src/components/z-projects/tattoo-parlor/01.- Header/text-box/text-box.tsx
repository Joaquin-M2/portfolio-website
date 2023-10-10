import styles from './text-box.module.scss';

import TP_MainButton from '../../Common/Main button/main-button';

interface TextBoxProps {
  TopTitle: string | JSX.Element;
  SubTitle: string | JSX.Element | JSX.Element[];
}

const TextBox: React.FC<TextBoxProps> = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        <span className={styles.mainTitle_Top}>{props.TopTitle}</span>
        <span className={styles.mainTitle_Sub}>{props.SubTitle}</span>
      </h1>

      <TP_MainButton aimingSection="#" additionalStyles={styles.whiteButton}>
        Discover our tattoos
      </TP_MainButton>
    </div>
  );
};

export default TextBox;
