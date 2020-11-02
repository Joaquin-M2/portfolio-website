import Project from '../utils/create-project';

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
        '/porsche-cayman.jpg',
        '/porsche-cayman.jpg',
        ['HTML'],
        '00000 Porsche Cayman wapens del to. Buy dis bugi mi boi. Ae',
        'https://www.google.com',
        '/portfolio/projects/project1',
        123,
        456,
        789
    ),
    new Project(
        2,
        '/porsche-cayman.jpg',
        '/porsche-cayman.jpg',
        ['HTML'],
        '11111 Porsche Cayman wapens del to. Buy dis bugi mi boi. Aenean aliquam nisi vitae lorem aliquet, ac suscipit nibh hendrerit. Pellentesque fermentum, quam sit amet dapibus ullamcorper, sem enim eleifend mi, vel aliquam dui nunc lacinia ex. Cras dictum at risus in viverra. Vestibulum mauris sem, ullamcorper ac lobortis at, rutrum sit amet tellus. In varius dui lacus. Quisque commodo lectus ac lectus suscipit ullamcorper. Suspendisse ultrices leo id felis laoreet hendrerit eget et eros. Sed laoreet velit nulla, nec laoreet urna ornare vel. Morbi blandit turpis quis justo eleifend rhoncus. Quisque dolor diam, iaculis et lobortis nec, pellentesque et libero. Sed bibendum mi vitae tortor auctor aliquet.',
        'https://www.google.com',
        '/portfolio/projects/project1',
        'Blabla',
        'Blabla Blabla',
        'Blabla Blabla Blabla',
        'Blabla Blabla Blabla Blabla',
        'Blabla Blabla Blabla Blabla Blabla'
    ),
    new Project(
        3,
        '/harley-vrod-muscle.jpg',
        '/harley-vrod-muscle.jpg',
        ['HTML', 'CSS'],
        '22222 Motoruka de alpha male. Buena bonita y barata si te sobra el moni.',
        'https://www.google.com',
        '/portfolio/projects/project2',
        'Bleble',
        'Bleble Bleble',
        'Bleble BlebleBleble',
        'Bleble Bleble Bleble Bleble'
    ),
    new Project(
        4,
        '/mansion',
        '/mansion-thumbnail.jpg',
        ['HTML', 'CSS', 'JavaScript'],
        '33333 Mansion.',
        'https://www.google.com',
        '/portfolio/projects/project3',
        'Blibli',
        'Blibli Blibli',
        'Blibli Blibli Blibli',
        'Blibli BlibliBlibliBlibli'
    ),
    new Project(
        5,
        '/ovcharka.jpg',
        '/ovcharka.jpg',
        ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
        '44444 Perrino ovcharka.',
        'https://www.google.com',
        '/portfolio/projects/project4',
        'Bloblo',
        'BlobloBloblo',
        'Bloblo Bloblo Bloblo',
        'Bloblo Bloblo Bloblo Bloblo'
    ),
    new Project(
        6,
        '/yacht.jpg',
        '/yacht.jpg',
        ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
        '55555 Yate.',
        'https://www.google.com',
        '/portfolio/projects/project5',
        'Blublu',
        'Blublu Blublu',
        'Blublu Blublu Blublu',
        'BlubluBlublu Blublu Blublu'
    ),
];

export default projects;
