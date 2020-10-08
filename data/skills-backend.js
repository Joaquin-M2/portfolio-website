import Skill from '../utils/create-skill';
import tech from './techs-names';

const technologies = [
    new Skill(
        tech.SQL,
        <>
            <p>SQL databases are those managed via Structured Query Language (SQL). That is to say, in order to interact with SQL databases it is necessary to use a &ldquo;special&rdquo; language known as SQL.</p>
            <p>Additionally, the main features of this kind of databases consist of their structure, the type of data stored and the relation among them. Therefore, in SQL databases:</p>
            <ul>
                <li>Data is stored in tables (i.e. databases are made of tables);</li>
                <li>The type of data stored has to be defined beforehand (i.e. these databases need a strict structure/schema definition);</li>
                <li>In case of needing to relate data between tables, it is necessary to create explicit relations between them.</li>
            </ul>
            <p>It is also remarkable the fact that, in case the application that uses SQL database(s) in the backend grows up quickly, scaling the database horizontally (increasing the number of servers) could be become so troublesome or even impossible. There are also some limitations to efficiency when dealing with a massive number of queries.</p>
        </>
    ),
    new Skill(
        tech.NODEJS,
        <>
            <p>Node.js is a JavaScript runtime environment that allows the configuration of the backend of web applications using the same scripting language we do in the frontend: JavaScript.</p>
            <p>One of the many benefits of Node.js is the one aforementioned: Developers don&rsquo;t need to spend time on learning and practicing other languages to become proficient at programming the backend of web applications. If you have mastered vanilla JavaScript, learning to use Node.js becomes especially easy.</p>
            <p>Additionally, Node.js allows an easy implementation of third-party libraries. These packages can enhance the productivity of developers and, sometimes, they allow the implementation of some functionalities that otherwise would be too hard to use.</p>
        </>
    ),
    new Skill(
        tech.EXPRESS,
        <>
            <p>Express.js is one of the most popular frameworks for Node.js.</p>
            <p>Through the use of Express.js, creating backend applications with Node.js becomes easier thanks to the simplification provided to deal with the HTTP requests and responses of our project.</p>
            <p>Additionally, even though Express.js simplicity makes it lack some functionalities by default, we can add them to the framework through the installation of the required third-party packages that we may need.</p>
        </>
    ),
    new Skill(
        tech.SEQUELIZE,
        <>
            <p>Sequelize is an Object-Relational Mapping (ORM) library that simplifies the interaction with SQL databases from our backend code.</p>
            <p>In a nutshell, using Sequelize allows developers to interact with this kind of databases without having to manually create complex SQL queries (and therefore, there is no need of learning the SQL language at a mastery level).</p>
        </>
    ),
    new Skill(
        tech.NOSQL,
        <>
            <p>NoSQL databases are those that follow an opposite approach to SQL databases (and, in fact, that&rsquo;s the reason of the &ldquo;NoSQL&rdquo; name).</p>
            <p>In NoSQL databases (such as MongoDB), data is not stored in tables but in &ldquo;collections&rdquo;, which at the same time store &ldquo;documents&rdquo;. The main consequence consists of its flexibility to store different kinds of data with no need of configuring beforehand the data types of its content.</p>
            <p>Additionally, there is no special language required to interact with NoSQL databases. This interaction can be performed, for instance, using JavaScript code via Node.js.</p>
            <p>It also stands out the fact that NoSQL databases can be scaled vertically (improving the server) but also horizontally (increasing the number of servers), as well as they have a great performance even when they have to deal with a massive number of requests.</p>
        </>
    ),
    new Skill(
        tech.MONGOOSE,
        <>
            <p>Mongoose is an Object-Document Mapping (ODM) library that simplifies the interaction with NoSQL databases from the backend code of our web application.</p>
            <p>Even though we don&rsquo;t have to learn any special language (such as SQL) to interact with NoSQL databases, the use of an ODM such as Mongoose makes the interaction with this kind of databases much easier. The result is an improvement of efficiency on developers, as well as it lowers the possibility of producing bugs while developing the backend of the application.</p>
        </>
    )
]

export default technologies;