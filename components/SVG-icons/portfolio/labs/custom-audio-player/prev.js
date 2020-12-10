import { forwardRef } from 'react';

import styles from './cmp-buttons.module.scss';

const Prev = forwardRef((props, ref) => {
  return (
    <svg
      ref={ref}
      className={`${styles.cmpButtons} ${props.additionalStyles}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      // width="32"
      // height="32"
      viewBox="0 0 32 32"
    >
      <title>Prev</title>
      <path d="M8 28v-24h4v11l10-10v22l-10-10v11z"></path>
    </svg>
  );
});

export default Prev;
