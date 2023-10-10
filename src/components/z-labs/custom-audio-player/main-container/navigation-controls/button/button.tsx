import styles from './button.module.scss';

interface NavButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | JSX.Element[];
}

const NavButton: React.FC<NavButtonProps> = props => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default NavButton;
