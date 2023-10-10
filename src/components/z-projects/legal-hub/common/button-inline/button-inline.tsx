import { PropsWithChildren } from 'react';
import styles from './button-inline.module.scss';

const ButtonInline = ({ children }: PropsWithChildren) => {
  return <button className={styles.button}>{children}</button>;
};

export default ButtonInline;
