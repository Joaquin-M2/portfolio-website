import { forwardRef } from 'react';

import styles from './cmp-buttons.module.scss';

interface PlayProps {
  additionalStyles: string;
}

const Play = forwardRef<SVGSVGElement, PlayProps>((props, ref) => {
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
      <title>Play</title>
      <path d="M6 4l20 12-20 12z"></path>
    </svg>
  );
});

export default Play;
