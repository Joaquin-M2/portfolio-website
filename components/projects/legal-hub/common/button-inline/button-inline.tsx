import styles from './button-inline.module.scss';

const ButtonInline: React.FC = props => {
  return <button className={styles.button}>{props.children}</button>;
};

export default ButtonInline;
