import { forwardRef } from 'react';

import styles from './video-screen.module.scss';

/**
 * This component receives the refs that may be applied to it from its parent component, which is
 * the one that may import it and use, for instance, the "useRef()" React hook on it.
 *
 * For this purpose, it was used the "forwardRef" function/method (imported from "react") together
 * with two generics (the first one is the HTML element in which the "ref" will be applied to) and
 * the TypeScript interface that will be applied to the whole component. See line 22.
 *
 * Additionally, it is also necessary to use a second parameter together with "props": "ref".
 */

interface VideoScreenProps {
  poster: string;
  src: string;
  onClick: React.MouseEventHandler<HTMLVideoElement>;
}

const VideoScreen = forwardRef<HTMLVideoElement, VideoScreenProps>(
  (props, ref) => {
    return (
      <video
        className={styles.screen}
        poster={props.poster}
        src={props.src}
        onClick={props.onClick}
        ref={ref}
      >
        <source src={props.src} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    );
  }
);

export default VideoScreen;
