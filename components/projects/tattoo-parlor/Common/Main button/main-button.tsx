import styles from './main-button.module.scss';

interface MainButtonProps {
  aimingSection: string;
  additionalStyles: string;
  children: string;
}

const MainButton: React.FC<MainButtonProps> = (props) => {
  return (
    <a
      href={props.aimingSection}
      className={`${styles.button} ${props.additionalStyles}`}
    >
      {props.children}
    </a>
  );
};

export default MainButton;
