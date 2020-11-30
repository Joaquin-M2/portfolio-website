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
    'Test lab 4',
    '/test-labs-4',
    ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    '44444 Euros euros.',
    'https://www.google.com',
    '/portfolio/projects/project4',
    'Bloblo',
    'Bloblo Bloblo',
    'Bloblo Bloblo Bloblo'
  ),
  new Lab(
    5,
    'Test lab 5',
    '/test-labs-5',
    ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    '55555 Moni moni Moni moni Moni moni.',
    'https://www.google.com',
    '/portfolio/projects/project5',
    'Blublu',
    'Blublu Blublu',
    'Blublu Blublu Blublu'
  ),
];

export default projects;
