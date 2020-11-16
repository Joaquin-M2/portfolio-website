import styles from './button.module.scss';

interface ButtonProps {
  path: string;
  children: string;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <a
      href={props.path}
      className={styles.button}
      target={
        (props.path.includes('/portfolio/projects/tattoo') ||
          props.path.includes('#')) &&
        !props.path.includes('github')
          ? null
          : '_blank'
      }
    >
      {props.children}
    </a>
  );
};

export default Button;
