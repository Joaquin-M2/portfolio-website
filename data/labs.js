import Lab from '../utils/create-project';
import techs from './techs-names';

// id --> The ID of the first element has to be 1.
// default image path
// technologies used --> array
// description
// linkToCode --> GitHub
// linkToProject --> Page to interact with the project itself
// details --> As many arguments/details as necessary

const projects = [
  new Lab(
    1,
    'Cinema Seats Booking',
    '/labs/cinema-seats-booking/cinema-seats-booking',
    [techs.HTML, techs.CSS, techs.JAVASCRIPT, techs.TYPESCRIPT, techs.REACT],
    'Small application in which you can book seats in a movie theater.',
    'https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/movie-seats-booking/index.tsx',
    '/portfolio/labs/movie-seats-booking',
    'HTML (JSX) | CSS (SCSS) | JS (TS) | React (TS);',
    'The state of the seats of every movie is generated randomly and kept when changing between movies.'
  ),
  new Lab(
    2,
    'Breakout Game',
    '/labs/breakout-game/breakout-game',
    [techs.HTML, techs.CSS, techs.JAVASCRIPT, techs.TYPESCRIPT, techs.REACT],
    (
      <span>
        Basic Breakout game.
        <br />
        <br />
        For its creation it was used a dynamic HTML5 canvas.
        <br />
        <br />
        You can move the paddle with your keyboard arrow keys!
      </span>
    ),
    'https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/breakout-game/index.tsx',
    '/portfolio/labs/breakout-game',
    'HTML (JSX) | CSS (SCSS) | JS (TS) | React (TS);',
    'The application consists of a dynamic HTML5 canvas;',
    'Use your keyboard arrow keys to move the paddle!'
  ),
  new Lab(
    3,
    'Custom Video Player',
    '/labs/custom-video-player/custom-video-player',
    [techs.HTML, techs.CSS, techs.JAVASCRIPT, techs.TYPESCRIPT, techs.REACT],
    (
      <span>
        Basic custom video player: The shape of the video player, size and
        thumbnail (image before playing the video) are fully customized. The
        same applies to the controls bar, which uses vectors (SVG) for the
        buttons and custom fonts for the timer; the progress bar also uses some
        custom styles.
        <br />
        <br />
        For the creation of this video player it was used the HTML5 video API.
      </span>
    ),
    'https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/custom-video-player/index.tsx',
    '/portfolio/labs/custom-video-player',
    'HTML (JSX) | CSS (SCSS) | JS (TS) | React (TS);',
    'The application consists of a basic (but fully customized) video player;',
    'It uses the HTML5 video API.'
  ),
  new Lab(
    4,
    'Custom Audio Player',
    '/labs/custom-audio-player/custom-audio-player',
    [techs.HTML, techs.CSS, techs.JAVASCRIPT, techs.TYPESCRIPT, techs.REACT],
    (
      <span>
        This lab consists of a basic custom audio player. Its shape is fully
        customized, an it includes some visual effects such as a spinning disc
        (with a themed image) when the song is playing. The buttons are SVG.
        <br />
        <br />
        In addition to the minimum features a music player should have (play &
        pause, next song, previous song), the progress bar is clickable, so you
        can go to a specific moment in the song.
        <br />
        <br />
        For the creation of this audio player it was used the HTML5 audio API.
        <br />
        <br />
        There will be a good bunch of improvements in the future, such as a
        volume manager and a songs picker, among others.
      </span>
    ),
    'https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/custom-audio-player/index.tsx',
    '/portfolio/labs/custom-audio-player',
    'HTML (JSX) | CSS (SCSS) | JS (TS) | React (TS);',
    'Basic custom audio player with some CSS effects;',
    'It uses the HTML5 audio API.'
  ),
  new Lab(
    5,
    'Test lab 5',
    '/test-labs-5',
    ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    '55555 Test.',
    'https://www.google.com',
    '/portfolio/projects/project5',
    'Test',
    'Test Test',
    'Test Test Test'
  ),
];

export default projects;
