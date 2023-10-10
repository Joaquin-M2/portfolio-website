import { forwardRef } from 'react';

import styles from './song-info.module.scss';

interface SongInfoProps {
  appear: boolean;
  songTitle: string;
}

const SongInfo = forwardRef<HTMLDivElement, SongInfoProps>((props, ref) => {
  return (
    <div
      className={`${styles.songInfo} ${
        props.appear ? styles.appearSongInfo : null
      }`}
    >
      <h4 className={styles.songTitle}>{props.songTitle}</h4>
      <div className={styles.songProgressContainer}>
        <div className={styles.songProgress} ref={ref}></div>
      </div>
    </div>
  );
});

export default SongInfo;
