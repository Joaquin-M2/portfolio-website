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
        'Test project 1',
        '/test-projects-1',
        ['HTML'],
        '11111 Project: Curabitur auctor tellus erat, non pellentesque velit luctus aliquam. Nulla ullamcorper cursus lorem, scelerisque imperdiet purus convallis auctor. Curabitur porta diam vel eros volutpat, non scelerisque libero lobortis. Morbi maximus dui ut porta imperdiet. Aenean tincidunt, ipsum viverra pulvinar sollicitudin, augue odio viverra ipsum, vel luctus orci lacus in lectus. Sed at odio quis justo tincidunt dignissim non non neque. Etiam quam augue, fringilla non magna eget, volutpat rutrum urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ut faucibus metus, sed porta tortor. Nulla at fringilla dui, a venenatis libero. Mauris ultrices nunc sed lorem imperdiet, ut egestas justo lobortis. Aenean ac dolor suscipit, fringilla purus et, dignissim nulla. Ut dapibus cursus libero nec hendrerit.',
        'https://www.google.com',
        '/portfolio/projects/project1',
        'Blabla',
        'Blabla Blabla',
        'Blabla Blabla Blabla',
        'Blabla Blabla Blabla Blabla',
        'Blabla Blabla Blabla Blabla Blabla'
    ),
    new Project(
        2,
        'Test project 2',
        '/test-projects-2',
        ['HTML', 'CSS'],
        '22222 Project: Ut porta consectetur urna ac interdum. Mauris arcu sapien, lobortis sed dui eget, iaculis vehicula lectus. Cras tincidunt efficitur ex, at pellentesque risus convallis nec.',
        'https://www.google.com',
        '/portfolio/projects/project2',
        'Bleble',
        'Bleble Bleble',
        'Bleble BlebleBleble',
        'Bleble Bleble Bleble Bleble'
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
