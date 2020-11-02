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
        '/tio-gilito1.png',
        '/tio-gilito1.png',
        ['HTML'],
        '11111 Moni moni.',
        'https://www.google.com',
        '/portfolio/projects/project1',
        'Blabla',
        'Blabla Blabla',
        'Blabla Blabla Blabla'
    ),
    new Lab(
        2,
        '/dollars.jpeg',
        '/dollars.jpeg',
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
        '/tio-gilito2.png',
        '/tio-gilito2.png',
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
        '/euros.jpg',
        '/euros.jpg',
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
        '/tio-gilito3.jpg',
        '/tio-gilito3.jpg',
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
