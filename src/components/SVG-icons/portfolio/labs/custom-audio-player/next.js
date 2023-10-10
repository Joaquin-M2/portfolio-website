import { forwardRef } from 'react';

import styles from './cmp-buttons.module.scss';

const Next = forwardRef((props, ref) => {
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
      <title>Next</title>
      <path d="M24 4v24h-4v-11l-10 10v-22l10 10v-11z"></path>
    </svg>
  );
});

export default Next;
