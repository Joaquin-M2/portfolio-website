import Head from 'next/head';

import { useEffect, useRef, useState } from 'react';

import styles from './custom-video-player.module.scss';

import Title from '../../../../components/labs/custom-video-player/title/title';
import VideoScreen from '../../../../components/labs/custom-video-player/video-screen/video-screen';
import VideoControls from '../../../../components/labs/custom-video-player/video-controls/video-controls';

import TonguesContainer from '../../../../components/common/tongues-container/tonguesContainer';

const CustomVideoPlayer: React.FC = () => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const [progressBarValue, setProgressBarValue] = useState('0');

  /**
   * These states, used by the timer (check the returned componed given by this React.FC), need to
   * be of type "string" even though they are numbers.
   */
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  /**
   * Attention to the fact that these "refs" are applied to custom components, not native JSX
   * elements. Therefore, they were "tweaked" on their original file through the use of "forwardRef",
   * the "ref" parameter and so on (visit the files of those components for more information).
   */
  const videoScreenRef = useRef<HTMLVideoElement>(null);
  const videoProgressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const video = videoScreenRef.current;
    const videoProgress = videoProgressRef.current;

    /**
     * Automattically move the process bar (input range) when reproducng the video.
     */
    function updateBarVideoProgress() {
      if (video.currentTime !== video.duration) {
        return (videoProgress.value = (
          (video.currentTime / video.duration) *
          100
        ).toString());
      } else {
        return setVideoIsPlaying(false);
      }
    }

    /**
     * Setting the time at which the video should be reproducing when the progress bar is clicked.
     */
    function setVideoTime() {
      video.currentTime = (+videoProgress.value * video.duration) / 100;
    }

    /**
     * Automatically update the timer (the numbers after the progress bar).
     * Attention to the conditionals.
     */
    function updateTimer() {
      let minutesVar = Math.floor(video.currentTime / 60);
      let secondsLastDigit = Math.floor(video.currentTime - 60 * minutesVar);

      /**
       * Conditionals managing the minutes.
       */
      if (minutesVar <= 9) {
        setMinutes(`0${minutesVar.toString()}`);
      } else {
        setMinutes(minutesVar.toString());
      }

      /**
       * Conditionals managing the seconds.
       */
      if (secondsLastDigit <= 9) {
        setSeconds(`0${secondsLastDigit}`);
      } else {
        setSeconds(secondsLastDigit.toString());
      }
    }

    /**
     * Reaction when clicking the "Stop" button.
     */
    function stopVideo() {
      video.pause();
      video.currentTime = 0;
    }

    /**
     * Reaction when clicking the "Play" and "Pause" buttons.
     * They share the same position; they are toggled when they are clicked.
     */
    function playAndPause() {
      if (videoIsPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    playAndPause();

    /**
     * Event listeners applied on elements referenced by "useRef()" need to be defined inside the
     * "useEffect()" react hook.
     */
    video.addEventListener('timeupdate', () => {
      updateBarVideoProgress();
      updateTimer();
    });
    videoProgress.addEventListener('change', setVideoTime);
    videoProgress.previousElementSibling.addEventListener('click', stopVideo);
  }, [videoIsPlaying]);

  return (
    <>
      <Head>
        <title>Portfolio JM2: Labs - Custom Video Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Title>Custom Video Player</Title>
        <VideoScreen
          ref={videoScreenRef}
          poster="/labs/custom-video-player/poster.png"
          src="/labs/custom-video-player/ibiza-formentera.mp4"
          onClick={() => setVideoIsPlaying(prevState => !prevState)}
        />
        <VideoControls
          ref={videoProgressRef}
          onClick={() => setVideoIsPlaying(prevState => !prevState)}
          onClickStop={() =>
            setVideoIsPlaying(prevState => (prevState ? !prevState : prevState))
          }
          togglePlayAndPauseButtons={videoIsPlaying}
          timestampContent={`${minutes}:${seconds}`}
        />
      </div>
      <TonguesContainer CheckCodePath="https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/custom-video-player/index.tsx" />
    </>
  );
};

export default CustomVideoPlayer;