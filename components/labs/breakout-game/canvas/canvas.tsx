import React, { useState, useEffect, forwardRef } from 'react';

import styles from './canvas.module.scss';

/**
 * More info about giving refs to functional components:
 * https://stackoverflow.com/questions/60052450/in-react-using-typescript-how-do-i-pass-a-ref-to-a-custom-component-using-reff
 */

const Canvas = forwardRef<HTMLCanvasElement>((props, ref) => {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, [height]);

  return (
    <canvas
      ref={ref}
      className={styles.canvas}
      width={width * 0.85}
      height={height * 0.75}
    ></canvas>
  );
});

export default Canvas;
