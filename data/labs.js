import Lab from '../utils/create-project';

// id --> The ID of the first element has to be 1.
// default image path
// thumbnail path
// technologies used --> array
// description
// linkToCode --> GitHub
// linkToProject --> Page to interact with the project itself
// details --> As many arguments/details as necessary

const projects = [
    new Lab(
        1,
        'Cinema Seats Booking',
        '/cinema-seats-booking',
        ['HTML, CSS, JavaScript, TypeScript, React'],
        'Small application in which you can book seats in a movie theater.',
        'https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/movie-seats-booking/index.tsx',
        '/portfolio/labs/movie-seats-booking',
        'HTML (JSX), CSS (SCSS), JavaScript (TypeScript) and React.',
        'Blabla Blabla',
        'Blabla Blabla Blabla'
    ),
    new Lab(
        2,
        'Test lab 2',
        '/test-labs-2',
        ['HTML', 'CSS'],
        '22222 Dollars dollars.',
        'https://www.google.com',
        '/portfolio/projects/project2',
        'Bleble',
        'Bleble Bleble',
        'BlebleBleble Bleble'
    ),
    new Lab(
        3,
        'Test lab 3',
        '/test-labs-3',
        ['HTML', 'CSS', 'JavaScript'],
        '33333 Moni moni Moni moni Moni moni.',
        'https://www.google.com',
        '/portfolio/projects/project3',
        'Blibli',
        'Blibli Blibli',
        'Blibli Blibli Blibli'
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
