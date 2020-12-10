import Head from 'next/head';

import styles from './custom-audio-player.module.scss';

import { useState, useEffect, useRef } from 'react';

import Title from '../../../../components/labs/custom-audio-player/title/title';
import MainContainer from '../../../../components/labs/custom-audio-player/main-container/main-container';

import SongInfo from '../../../../components/labs/custom-audio-player/main-container/song-info/song-info';
import SongImage from '../../../../components/labs/custom-audio-player/main-container/image-container/image-container';

import AudioAPI from '../../../../components/labs/custom-audio-player/main-container/audio-API/audio-API';

import NavControls from '../../../../components/labs/custom-audio-player/main-container/navigation-controls/navigation-controls';
import NavButton from '../../../../components/labs/custom-audio-player/main-container/navigation-controls/button/button';
import Prev from '../../../../components/SVG-icons/portfolio/labs/custom-audio-player/prev';
import Play from '../../../../components/SVG-icons/portfolio/labs/custom-audio-player/play';
import Pause from '../../../../components/SVG-icons/portfolio/labs/custom-audio-player/pause';
import Next from '../../../../components/SVG-icons/portfolio/labs/custom-audio-player/next';

import TonguesContainer from '../../../../components/common/tongues-container/tonguesContainer';

const songs = ['Hip Jazz', 'Samba', 'High Octane'];

const CustomMusicPlayer: React.FC = () => {
  const [musicIsPlaying, setMusicIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  let currentSong = songs[currentSongIndex];
  let checkCurrentSongIndex = currentSongIndex;

  /**
   * Creation of refs for JSX elements through the useRef() hooks.
   */

  // AUDIO AND PROGRESS BAR
  const audioRef = useRef<HTMLAudioElement>();
  const progressBarRef = useRef<HTMLDivElement>();

  // BUTTONS

  const prevButtonRef = useRef<SVGSVGElement>();
  const playButtonRef = useRef<SVGSVGElement>();
  const pauseButtonRef = useRef<SVGSVGElement>();
  const nextButtonRef = useRef<SVGSVGElement>();

  useEffect(() => {
    // ---------- Variables containing the refs. ----------
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    // Buttons.
    const prevButton = prevButtonRef.current;
    const playButton = playButtonRef.current;
    const pauseButton = pauseButtonRef.current;
    const nextButton = nextButtonRef.current;

    function playSong() {
      audio.play();
    }

    function pauseSong() {
      audio.pause();
    }

    function prevSong() {
      checkCurrentSongIndex--;

      if (checkCurrentSongIndex < 0) {
        setCurrentSongIndex(songs.length - 1);
        checkCurrentSongIndex = songs.length - 1;
      } else {
        setCurrentSongIndex(prevState => prevState - 1);
      }
      setMusicIsPlaying(true);
      playSong();
    }

    function nextSong() {
      checkCurrentSongIndex++;

      if (checkCurrentSongIndex > songs.length - 1) {
        setCurrentSongIndex(0);
        checkCurrentSongIndex = 0;
      } else {
        setCurrentSongIndex(prevState => prevState + 1);
      }
      setMusicIsPlaying(true);
      playSong();
    }

    function updateProgressBar(event) {
      const { duration, currentTime } = event.target;
      const songProgress = (currentTime / duration) * 100;
      progressBar.style.width = `${songProgress}%`;
    }

    function changeProgress(event) {
      const fullLengthOfBar = this.clientWidth;
      const lengthOfBarWhereClicked = event.offsetX;
      const duration = audio.duration;
      audio.currentTime =
        (lengthOfBarWhereClicked / fullLengthOfBar) * duration;
    }

    // ===== EVENT LISTENERS =====
    // For buttons

    prevButton.addEventListener('click', prevSong);
    playButton.addEventListener('click', playSong);
    pauseButton.addEventListener('click', pauseSong);
    nextButton.addEventListener('click', nextSong);

    // For progress bar

    audio.addEventListener('timeupdate', updateProgressBar);
    progressBar.parentElement.addEventListener('click', changeProgress);

    // For end of song

    audio.addEventListener('ended', nextSong);
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio JM2: Labs - Custom Video Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.appContainer}>
        <Title title="Custom Music Player" />
        <MainContainer>
          <SongImage
            songImage={`/labs/custom-audio-player/songs/${currentSong}.jpg`}
            songName={`"${currentSong}"`}
            spin={musicIsPlaying}
          />
          <SongInfo
            ref={progressBarRef}
            songTitle={currentSong}
            appear={musicIsPlaying}
          />
          <AudioAPI
            ref={audioRef}
            src={`/labs/custom-audio-player/songs/${currentSong}.mp3`}
          />
          <NavControls>
            <NavButton>
              <Prev ref={prevButtonRef} />
            </NavButton>
            <NavButton
              onClick={() => {
                setMusicIsPlaying(prevState => !prevState);
              }}
            >
              <Pause
                additionalStyles={!musicIsPlaying ? styles.hideButton : null}
                ref={pauseButtonRef}
              />
              <Play
                additionalStyles={musicIsPlaying ? styles.hideButton : null}
                ref={playButtonRef}
              />
            </NavButton>
            <NavButton>
              <Next ref={nextButtonRef} />
            </NavButton>
          </NavControls>
        </MainContainer>
      </div>
      <TonguesContainer CheckCodePath="https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/custom-audio-player/index.tsx" />
    </>
  );
};

export default CustomMusicPlayer;
