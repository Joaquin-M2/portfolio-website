<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://portfolio-website-joaquin-m2.vercel.app/">
    <img src="public\JM2-Frontend.png" alt="Logo">
  </a>

  <h3 align="center">Joaquin-M2 portfolio website - Frontend</h3>

  <p align="center">
    Frontend repository of my portfolio website
    <br />
    <a href="https://github.com/Joaquin-M2/portfolio-website-backend"><strong>Explore the backend »</strong></a>
    <br />
    <br />
    <a href="https://portfolio-website-joaquin-m2.vercel.app/">Visit Website</a>
    ·
    <a href="https://portfolio-website-joaquin-m2.vercel.app/contact">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#site-sections">Site Sections</a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#tools">Tools</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center"><img src="public\projects\portfolio-website\portfolio-website-medium.jpg" alt="Homepage screenshot"></div>
<br />
<p>This website aims to reflect some of my technical skills about web development. It is still under construction, so don't feel surprised if there are some missing elements such as loaders or even projects in the "Portfolio" section (which is still a bit empty :slightly_smiling_face:).</p>

<p>It is a project that started several years ago when I was at the beginning of my webdev career, as it can be appreciated on its "authentic" design. From a UI perspective, I would like to stay loyal to its original design as much as possible, as it helps me to remind how I started on this professional path. Nevertheless, I invite you to check the code and be as critical as you want (any improvement suggestion is very appreciated!). You can also visit the "Portfolio" section, where you can find some projects that really use professional UIs.</p>

<p>Additionally, I may include some sections that don't aim to be part of an archetypical portfolio website, but that I find useful. An example is the "Tools" section, where I gather some links to websites and tweets that at some point helped me at work.</p>

<p>This repository only concerns to the frontend side of my personal website, which is hosted at <a href="https://vercel.com/" target="_blank">Vercel</a>. If you are curious about the backend, feel free to visit <a href="https://github.com/Joaquin-M2/portfolio-website-backend" target="_blank">its repository</a>.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Site Sections

### Home

The homepage is just a welcoming page for users visiting the root domain. I also reference the sections that I may find more important to the most relevant visitors (aka employers and clients :slightly_smiling_face:), such as the Portfolio section ("my portfolio" button) and the Contact section ("drop me a line" button).

The text on this page will change quite often, depending on how confident I feel with backend new trends and technologies (so replacing "Full-Stack" with "Frontend" Web Developer and vice versa :slightly_smiling_face:).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Portfolio

This section is split in two sub-sections: Projects and Labs.

Each project and lab has its own description, highlighting their most important features.

#### Projects

Here you can find full websites that I have done in my spare time and some templates that I use to help clients decide what elements they want in their website.

Some projects may be done with technologies different to those used for this personal website (such as frameworks), so don't be surprised if you see so many npm packages in `package.json` :slightly_smiling_face:.

#### Labs

Here I have some experiments with technologies that usually are not requested by clients, such as the audio and canvas browser APIs. Some labs are also just some components that don't fit in any of the projects I have done, but I wanted to experiment with.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Skills

This section is also split in two: Frontend and Backend.

Both are quite similar from a structure point of view, using trees of items. Each item is clickable, and it will take you to the website of the referenced technology.

You will also see that there is a progress bar on each item. It refers to my level of confidence and knowledge of that skill. If I feel it is below 50% I won't include it in this section, even though I may be aware and have experimented with it.

#### Frontend

Here you can see three blocks of skills, each of them referencing the three pillars of frontend web development: HTML, CSS and JavaScript.

Each of those blocks gather the technologies and skills that are related the most (at least from my perspective) to each of those three pillars.

#### Backend

Here there are two blocks of skills, which are quite simpler than those in the frontend section (if I could be considered fullstack it's just because I'm 80% frontend 20% backend :sweat_smile:).

The first block refers to those skills related to Node.js backend development, while the other one refers to Python backend development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Contact

Here you can find a form if you want to contact me via the website itself, as well as some other points of contact (email, GitHub and LinkedIn).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Tools

This section shows a collection of tools (i.e. websites and tweets) that I have found useful for web development.

The [backend repository](https://github.com/Joaquin-M2/portfolio-website-backend) was done as a requirement for this section due to the following functionalities:

- Storage in the database of the data of each tool;
- User authentication (so the favorite tools of each user can be stored in their own account);
- Adding, updating and deleting tools if the user account has the "Admin" role;
- Storing "tags", so tools can be easily filtered;
- Adding, updating and deleting tags if the user account has the "Admin" role.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

Technologies referenced in this section are only those used just for the personal website itself:

<div align="center">
  <table>
    <thead>
      <tr>
        <th>Development</th>
        <th>Testing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="https://nextjs.org/" target="_blank">
            <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js" />
          </a>
          <br />
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img src="https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=TypeScript" />
          </a>
          <br />
          <a href="https://sass-lang.com/" target="_blank">
            <img src="https://img.shields.io/badge/Sass-black?style=for-the-badge&logo=Sass" />
          </a>
          <br />
          <a href="https://react-hook-form.com/" target="_blank">
            <img src="https://img.shields.io/badge/React_Hook_Form-black?style=for-the-badge&logo=React%20Hook%20Form" />
          </a>
        </td>
        <td>
          <a href="https://storybook.js.org/" target="_blank">
            <img src="https://img.shields.io/badge/Storybook-black?style=for-the-badge&logo=Storybook" />
          </a>
          <br />
          <a href="https://jestjs.io/" target="_blank">
            <img src="https://img.shields.io/badge/Jest-black?style=for-the-badge&logo=Jest" />
          </a>
          <br />
          <a
            href="https://testing-library.com/docs/react-testing-library/intro/"
            target="_blank"
          >
            <img src="https://img.shields.io/badge/React_Testing_Library-black?style=for-the-badge&logo=Testing%20Library" />
          </a>
          <br />
          <a href="https://www.cypress.io/" target="_blank">
            <img src="https://img.shields.io/badge/Cypress-black?style=for-the-badge&logo=Cypress" />
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

Projects and labs in the "Portfolio" section may use something different; in that case it will be mentioned in their own description.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

If you want to setup this website in your own localhost, it is as simple as:

1. Install NPM packages:
   ```sh
   npm install
   ```
2. If you want to interact with any section that uses the backend (such as the Tools section), make sure you also set it up by [following the instructions on its repository](https://github.com/Joaquin-M2/portfolio-website-backend);
3. If you want to run the unit tests, run the following command in your terminal:
   ```sh
   npm run jest
   ```
4. If you want to run Storybook, run the following command in your terminal:
   ```sh
   npm run storybook
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Finish Tools section v1.0
- [ ] Fill the Tools section with real tools
- [x] Finish unit tests for core components
- [x] Integration tests
  - [x] Home
  - [x] Portfolio
  - [x] Skills
  - [x] Contact
  - [x] Tools
- [ ] E2E tests
  - [x] Home
  - [x] Portfolio
  - [x] Skills
  - [x] Contact
  - [ ] Tools
- [ ] Fix accessibility issues
  - [ ] Test with NVDA
  - [ ] Test with VoiceOver
- [ ] Fix responsiveness
- [ ] Fix Homepage background effect
- [ ] Add new projects

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Joaquín Moreno - [LinkedIn profile](https://www.linkedin.com/in/joaquin-m2/) - joaquin.mmol@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/joaquin-m2/
[product-screenshot]: public\projects\portfolio-website\portfolio-website-medium.jpg
