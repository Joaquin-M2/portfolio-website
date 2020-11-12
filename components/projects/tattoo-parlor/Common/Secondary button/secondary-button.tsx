import styles from './secondary-button.module.scss';

interface SecondaryButtonProps {
  link: string;
  additionalStyles?: string;
  children: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
  return (
    <a
      href={props.link}
      className={`${styles.secondaryButton} ${props.additionalStyles}`}
    >
      {props.children}
    </a>
  );
};

export default SecondaryButton;
