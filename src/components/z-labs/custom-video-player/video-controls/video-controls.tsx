import { forwardRef } from 'react';

import styles from './video-controls.module.scss';

import Play from '../../../../components/SVG-icons/portfolio/labs/custom-video-player/play';
import Pause from '../../../../components/SVG-icons/portfolio/labs/custom-video-player/pause';
import Stop from '../../../../components/SVG-icons/portfolio/labs/custom-video-player/stop';

/**
 * This component receives the refs that may be applied to it from its parent component, which is
 * the one that may import it and use, for instance, the "useRef()" React hook on it.
 *
 * For this purpose, it was used the "forwardRef" function/method (imported from "react") together
 * with two generics (the first one is the HTML element in which the "ref" will be applied to) and
 * the interface that will be applied to the whole component. See line 27.
 *
 * Additionally, it is also necessary to use a second parameter together with "props": "ref".
 */

interface VideoControlsProps {
  togglePlayAndPauseButtons: boolean;
  timestampContent: string | number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickStop: React.MouseEventHandler<HTMLButtonElement>;
}

const VideoControls = forwardRef<HTMLInputElement, VideoControlsProps>(
  (props, ref) => {
    return (
      <div className={styles.controls}>
        {props.togglePlayAndPauseButtons === false ? (
          <button onClick={props.onClick}>
            <Play additionalStyles={`${styles.button} ${styles.play}`} />
          </button>
        ) : (
          <button onClick={props.onClick}>
            <Pause additionalStyles={`${styles.button} ${styles.pause}`} />
          </button>
        )}
        <button onClick={props.onClickStop}>
          <Stop additionalStyles={`${styles.button} ${styles.stop}`} />
        </button>
        <input
          ref={ref}
          type='range'
          className={styles.progress}
          min='0'
          max='100'
          step='0.1'
          defaultValue='0'
        />
        <div className={styles.timestampContainer}>
          <span className={styles.timestamp}>{props.timestampContent}</span>
        </div>
      </div>
    );
  }
);

export default VideoControls;
