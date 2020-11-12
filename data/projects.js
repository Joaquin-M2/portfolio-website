import Project from '../utils/create-project';
import techs from './techs-names';

// id --> The ID of the first element has to be 1.
// image path
// technologies used --> array
// description
// linkToCode --> GitHub
// linkToProject --> Page to interact with the project itself
// details --> As many arguments/details as necessary

const projects = [
  new Project(
    1,
    'Portfolio website',
    '/portfolio-website',
    [
      techs.HTML,
      techs.CSS,
      techs.JAVASCRIPT,
      techs.TYPESCRIPT,
      techs.REACT,
      techs.NEXT,
    ],
    (
      <span>
        This is the first "big" project designed and coded from 0 by myself.
        <br />
        <br />
        The design (which I will change and improve in coming iterations) aims
        to divide the content on indiviual pages in order to avoid to the user
        the need of scrolling. The navigation is made through the use of routing
        in order to avoid the user the nuisance of dealing with loading times
        from HTTP requests.
        <br />
        <br />
        The general purpose of this project is to have an online tool to
        showcase all my potential as a web developer to any visitor, as well as
        providing an easy way to contact me.
        <br />
        <br />
        There is also a section in which I publicly upload some of my web
        development notes, blog posts and tools I work with.
      </span>
    ),
    'https://github.com/Joaquin-M2/portfolio-website',
    '/',
    'HTML (JSX) | CSS (SCSS) | JS (TS) | React (Next + TS);',
    'Uses routing to navigate between pages;',
    'Designed and coded from 0;',
    'Still under construction.'
  ),
  new Project(
    2,
    'Tattoo Parlor',
    '/tattoo-parlor',
    [techs.HTML, techs.CSS, techs.JAVASCRIPT, techs.TYPESCRIPT, techs.REACT],
    (
      <span>
        Homepage for a tattoo & piercing studio business.
        <br />
        <br />
        Originally, the design was made using only HTML and CSS. Nevertheless,
        the code of the project was adapted to React + TypeScript.
        <br />
        <br />
        It makes use of some customs fonts and vectors. Additionally, all icons
        and logos are SVG components.
        <br />
        <br />
        The design is inspired on Jonas Schmedtmann "Natours" project.
      </span>
    ),
    'https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/projects/tattoo-parlor/index.tsx',
    '/portfolio/projects/tattoo-parlor',
    'HTML (JSX) | CSS (SCSS) | JS (TS) | React (TS);',
    'Homepage for businesses demonstrator;',
    'It uses some custom fonts;',
    'All icons and logos are SVG;',
    'Design inspired by Jonas Schmedtmann "Natours" project.'
  ),
  new Project(
    3,
    'Test project 3',
    '/test-projects-3',
    ['HTML', 'CSS', 'JavaScript'],
    '33333 Project: Vestibulum felis orci, efficitur sit amet gravida ut, bibendum non mauris. Nullam quam nibh, euismod a enim ac, elementum hendrerit tortor. Ut porta aliquet tellus, eget laoreet ipsum ultricies non. Nam porttitor id risus ac euismod. In eleifend, dui semper aliquet facilisis, felis mauris egestas risus, imperdiet finibus urna tortor ut velit. Curabitur purus justo, fringilla quis egestas vitae, pharetra porta magna. Praesent ut malesuada ligula, eget volutpat sem. Nunc quis eros augue. Aenean scelerisque laoreet diam id euismod. Aenean placerat metus eu nibh dapibus viverra. Morbi pellentesque cursus ex, sit amet vulputate orci faucibus a. Phasellus vehicula metus non tortor tempus, eu sollicitudin nisl congue.',
    'https://www.google.com',
    '/portfolio/projects/project3',
    'Blibli',
    'Blibli Blibli',
    'Blibli Blibli Blibli',
    'Blibli BlibliBlibliBlibli'
  ),
  new Project(
    4,
    'Test project 4',
    '/test-projects-4',
    ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    '44444 Project: Nullam congue, sapien ut cursus pharetra, dui augue ultricies ex, quis tempor diam magna in enim. Duis ac lacus et sapien cursus imperdiet eget vel dui. Pellentesque vitae lorem et tortor commodo dictum.',
    'https://www.google.com',
    '/portfolio/projects/project4',
    'Bloblo',
    'BlobloBloblo',
    'Bloblo Bloblo Bloblo',
    'Bloblo Bloblo Bloblo Bloblo'
  ),
  new Project(
    5,
    'Test project 5',
    '/test-projects-5',
    ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    '55555 Project: Quisque convallis sapien ac velit dictum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut porttitor vehicula fermentum. Sed luctus in arcu in porta.',
    'https://www.google.com',
    '/portfolio/projects/project5',
    'Blublu',
    'Blublu Blublu',
    'Blublu Blublu Blublu',
    'BlubluBlublu Blublu Blublu'
  ),
];

export default projects;
