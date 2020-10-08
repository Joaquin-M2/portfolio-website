import Skill from '../utils/create-skill';
import tech from './techs-names';

const technologies = [
    new Skill(
        tech.HTML,
        <>
            <p>The HyperText Markup Language (HTML) is the core technology used to structure the content of any website and app.</p>
            <p>In addition to common patterns and tags used since the creation HTML, the update performed with HTML5 have included new syntactic capacities that have become essential for any web development project.</p>
            <p>Specifically, I am proficient in the use of the elements comprised in the following concepts:</p>
            <ul>
                <li>HTML patterns for structuring websites (forms included);
                    <ul>
                        <li>Knowing to properly use the attributes of each HTML tag;</li>
                    </ul>
                </li>
                <li>HTML semantic tags for a better SEO and accessibility performance;
                    <ul>
                        <li>In addition to new HTML5 tags;</li>
                    </ul>
                </li>
                <li>HTML entities;</li>
                <li>HTML Canvas;</li>
                <li>HTML Audio.</li>
            </ul>
        </>
    ),
    new Skill(
        tech.ACCESIBILITY,
        <>
            <p>In order to make web projects more easily accessible to people with disabilities, I follow the W3 &ldquo;Web Content Accessibility Guidelines&rdquo; (WCAG).</p>
            <p>Some examples of its use are the following:</p>
            <ul>
                <li>Creation of text content to complement non-text resources such as images;</li>
                <li>Special attention to the structure and use of web markup and other meta-information that may be required by users with special needs;</li>
                <li>Avoiding to design projects in which the use of a specific sense (such as the sense of sight or the sense of hearing) may become essential to the understanding of the information provided;</li>
                <li>Allowing the navigation entirely with just the keyboard, when the nature of the project allows it;</li>
                <li>Making intuitive the navigation through the websites and apps;</li>
                <li>Matching labels naming with the content and functionalities they refer to.</li>
            </ul>
        </>
    ),
    new Skill(
        tech.SEO,
        <>
            <p>Improving the Search Engine Optimization (SEO) of websites has become an essential asset for any business willing to keep (and improve) its relevance through the internet.</p>
            <p>Search engines such as Google require content with a correct structure, natural writing and relevant content. In order to satisfy search engines and make them notice about the relevancy of web projects, there are some techniques that I apply on the vast majority of my projects:</p>
            <ul>
                <li>Correct use of HTML (semantic) tags;</li>
                <li>Research of keywords in which I should focus to make projects appear on the search engines first page for as many internet users as possible;
                    <ul>
                        <li>Use of SEO tools such as SEMRush, Ahrefs, Google Search Console, Google Trends&hellip;</li>
                    </ul>
                </li>
                <li>Structuring keywords and synonyms within articles, titles included, keeping natural the keywords density;</li>
                <li>Creation of links in relevant websites (link building) in order to improve the relevancy of the project I work on. The relevancy becomes important for search engines (which is translated in a better positioning in search results) but also for users.</li>
            </ul>
        </>
    ),
    new Skill(
        tech.CSS,
        <>
            <p>The Cascading Style Sheets (CSS) is a style sheet language used to apply aesthetical effects to the elements we create through HTML. CSS is also what makes websites to be adapted to any screen size through the so-called &ldquo;responsive design&rdquo;.</p>
            <p>If we compare a website with a house, the code written in HTML is the structure of the building, while the CSS code is the paint and the way rooms are organized (&ldquo;positioned&rdquo;) in the house. CSS also provides some aesthetical automations (&ldquo;transitions&rdquo; and &ldquo;animations&rdquo;).</p>
            <p>CSS3 is the name given to the last version of this language, and it mainly includes positioning innovations such as flexbox and the grid.</p>
            <p>In addition to the proper use of CSS to style elements in websites and mobile applications, I am also aware (and use) naming conventions such as BEM (Block &ndash; Element &ndash; Modifier). On this way, I not only create the proper styling for projects in which I work on, but I also create easily maintainable style sheets.</p>
        </>
    ),
    new Skill(
        tech.SASS,
        <>
            <p>SASS (Syntactically Awesome Style Sheets) is a CSS preprocessor used to complement and enrich the CSS syntax.</p>
            <p>Due to the CSS simplicity, it lacks some key syntax that we can find in the vast majority of programming languages (CSS and HTML are not programming languages). Through the use of SASS we can include basic loops and conditionals to our CSS code.</p>
            <p>Additionally, SASS helps to keep a cleaner CSS code through the use of syntactical features such as:</p>
            <ul>
                <li>Variables (also available in pure CSS);</li>
                <li>Mixins;</li>
                <li>Extends;</li>
                <li>Functions.</li>
            </ul>
            <p>I usually use all of them in my projects due to the cleanliness they provide to any CSS style sheet we may want to keep easily maintainable.</p>
        </>
    ),
    new Skill(
        tech.UXandUI,
        <>
            <p>Before starting to code, it is key to be coordinated with all the stakeholders of the project.</p>
            <p>User experience (UX) is about aligning user goals with the business/project goals; otherwise we may suffer some frictions during the development, which may lead to re-doing part of the work, which results in a far lower efficiency.</p>
            <p>Without a proper planning, it becomes harder to deal with reasonable deadlines, costs may rise and, at the end, we may get a disappointing product with our initial goals.</p>
            <p>Due to the aforementioned reasons, it is necessary to start any project through a series of steps that will help us not only to properly plan the project itself, but also to avoid misunderstandings between stakeholders. Therefore, a good UX design requires a good UX planning.</p>
            <p>Some of those UX planning steps are the following:</p>
            <ol>
                <li>Keep always in mind the product strategy, the business strategy and the user needs;</li>
                <li>Do all the research you may find necessary to properly plan the project development: What will the user expect from our product? Do we have the resources to develop everything? Which are our limitations? Are we 100% sure we are following the correct path?</li>
                <li>Identify the business goals: What do we really expect about the project? Are we sure we are choosing the right tools to reach it?</li>
                <li>Identifying competitors, what can we learn from them and what are the mistakes they are committing. Special focus on those mistakes that users would appreciate if we avoid (or fix) them in our product.</li>
            </ol>
            <p>There are a good bunch of additional steps, but on this section I just want to let you know about the way I work when designing the UX of the projects where that task is reserved to me.</p>
            <p>On the other hand, I also have notions about user interface (UI) design. Some of the key concepts I keep in mind when preparing the UI design of a project are the following:</p>
            <ul>
                <li>Color harmony;</li>
                <li>The importance of spacing between elements in the layout;</li>
                <li>The kind of typography that better adapts to the topic the website/app is about;</li>
                <li>The importance of images;</li>
                <li>The importance of (explanatory) icons;</li>
                <li>How to arrange the elements of the web in order to improve the conversion.</li>
            </ul>
        </>
    ),
    new Skill(
        tech.JAVASCRIPT,
        <>
            <p>JavaScript is a scripting language used to make websites and apps &ldquo;smart&rdquo;, bringing them the dynamism they lack when only using HTML and CSS.</p>
            <p>JavaScript is the closest language to real programming we use when creating a website or app. Therefore, it is important not only to correctly use the syntax it provides, but also to apply common code design patterns to make it easily understandable for other developers or even ourselves.</p>
            <p>Due to the power of JavaScript and the dynamism it provides to web apps, we can even modify the HTML and CSS attending to some specific circumstances, as well as including events that will trigger when the conditions we programmed are met.</p>
            <p>JavaScript can be used at both: In the frontend and the backend (on this case it is commonly known as &ldquo;Node.js&rdquo;). You can find more information about it on the &ldquo;Backend&rdquo; tab of this &ldquo;Skills&rdquo; webpage.</p>
            <p>In addition to common JavaScript that may include the use of structures made of arrays, loops, conditionals, functions, web APIs, local storage, async code (promises) and so on, I am a proficient in the ES6+ version of JavaScript, which includes, among other features, the following:</p>
            <ul>
                <li>Variables declarations through &ldquo;let&rdquo; and &ldquo;const&rdquo;;</li>
                <li>OOP programming through classes;</li>
                <li>Spread and Rest operators;</li>
                <li>Async/await;</li>
                <li>Arrow functions.</li>
            </ul>
        </>
    ),
    new Skill(
        tech.TYPESCRIPT,
        <>
            <p>TypeScript is a superset of JavaScript: A language built as an extension of another. In practice, TypeScript is &ldquo;JavaScript on steroids&rdquo;, since it is pretty similar but with additional features that &ldquo;force&rdquo; developers to write cleaner and safer code from bugs.</p>
            <p>Since I learnt to use TypeScript, whenever it is possible I write my JavaScript code using TypeScript. I am also adapting the JavaScript code from my old projects to TypeScript.</p>
            <p>Specifically, in addition to common types, I take the most out of TypeScript possibilities through the use of many the tools it provides, such as:</p>
            <ul>
                <li>Tuples;</li>
                <li>Enums;</li>
                <li>Union types;</li>
                <li>Literal types;</li>
                <li>Function types (void, undefined, never&hellip;);</li>
                <li>Intersection types;</li>
                <li>Type guards;</li>
                <li>Type casting&hellip;</li>
            </ul>
            <p>TypeScript can be used in the same places where JavaScript can be used. Therefore, TypeScript is not used to only substitute vanilla JavaScript, but it also complements the use of libraries and frameworks such as React, Next.js and even at the backend of applications made with Node.js.</p>
        </>
    ),
    new Skill(
        tech.REACT,
        <>
            <p>Websites can be structured following a composition made of components: Each element visually independent can be created independently from the others (headers, navigation bars, sidebars, explanatory blocks&hellip;).</p>
            <p>React is a JavaScript library that allows the creation of this kind of components for websites, so they can be easily reused in order in increase the productivity of developers. For this purpose, React uses JSX, which allows the creation of elements through the use of code that may seem very similar to HTML, but it is in fact JavaScript behind the scenes.</p>
            <p>React also allows a smoother interaction of users with the client-side of our website thanks to the use of the virtual DOM. Users can interact with the website and, in many cases, there is no need of sending requests to the server and reload the page to visualize the changes.</p>
            <p>Additionally, React interacts with many other libraries, being &ldquo;Redux&rdquo; one of the most important. Since the update of React and the inclusion of React hooks, some of those libraries stopped having a key role in React applications.</p>
        </>
    ),
    new Skill(
        tech.REDUX,
        <>
            <p>Redux is a JavaScript library that is mainly used together with React.</p>
            <p>Redux was specially used as a way to manage the state of React applications. Nevertheless, since the addition of React hooks in the React library, there is not a big need of using Redux in this kind of applications.</p>
            <p>Nevertheless, I used Redux intensively in the past and, in fact, I keep using it in class-based React components that need some state management.</p>
        </>
    ),
    new Skill(
        tech.NEXT,
        <>
            <p>Next.js is a framework based on React. Its value comes from the capacity of creating hybrid web applications which may have both kind of pages: Server-side-rendered (SSR) pages and statically generated pages.</p>
            <p>Next.js comes into action to solve SEO problems that may arise in websites developed purely with React, as well as to improve efficiency an ease the developer job when the same website has to provide services of different nature.</p>
            <p>I developed this portfolio website using Next.js.</p>
        </>
    ),
    new Skill(
        tech.JEST,
        <>
            <p>Jest is the main JavaScript testing framework I currently use. It allows the creation of automated tests (unit tests and integration tests) that help not only to avoid bugs in the code, but also to improve the efficiency of development, since it is not the developer anymore the one who has to manually test the coded application.</p>
            <p>In addition to Jest, I also tend to use &ldquo;Puppeteer&rdquo; as a tool for End-to-End (E2E) testing.</p>
        </>
    )
]

export default technologies;