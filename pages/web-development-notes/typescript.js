import Head from 'next/head';
import { useRef, useEffect } from 'react';

import NavBarBottom from '../../components/projects/portfolio-website/nav-bar-bottom/nav-bar-bottom';

import LeftPanel from '../../components/projects/portfolio-website/wd-notes/left-panel/left-panel';
import RightPanel from '../../components/projects/portfolio-website/wd-notes/right-panel/right-panel';
import CorePanel from '../../components/projects/portfolio-website/wd-notes/core-panel/core-panel';
import HeaderCredits from '../../components/projects/portfolio-website/wd-notes/core-panel/header-credits/header-credits';

import styles from './wd-notes.module.scss';

export default function WDNotes_TypeScript() {
  const mainContainer = useRef();
  const indexContainer = useRef();

  ///////////////////////////////////////
  // AUTOMATICALLY MOVING INDEX
  // CREDITS: https://css-tricks.com/sticky-table-of-contents-with-scrolling-active-states/
  // MDN: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  useEffect(() => {
    const observer = new IntersectionObserver(entries =>
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (entry.intersectionRatio > 0) {
          indexContainer.current
            .querySelector(`a[href="#${id}"]`)
            .classList.add(styles.activeIndexElement);
        } else if (!indexContainer.current) {
          // Necessary to avoid an error when changing of page.
          return;
        } else {
          indexContainer.current
            .querySelector(`a[href="#${id}"]`)
            .classList.remove(styles.activeIndexElement);
        }
      })
    );

    mainContainer.current
      .querySelectorAll('section[id]')
      .forEach(section => observer.observe(section));
  }, [indexContainer.current]);

  const index = (
    <ul>
      <li>
        <a href="#que-es-ts">
          <span>&iquest;Qu&eacute; es TypeScript?</span>
        </a>
        <ul>
          <li>
            <a href="#mejoras-ts-js">
              <span>
                &iquest;Qu&eacute; mejoras a&ntilde;ade TypeScript frente al uso
                de JavaScript?
              </span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#instalar-ts">
          <span>Instalar y utilizar TypeScript</span>
        </a>
        <ul>
          <li>
            <a href="#compilar-ts">
              <span>Compilar c&oacute;digo TS a JS</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#types-ts">
          <span>Types</span>
        </a>
        <ul>
          <li>
            <a href="#type-inference">
              <span>Type inference</span>
            </a>
          </li>
          <li>
            <a href="#tipos-basicos-ts">
              <span>Tipos b&aacute;sicos de &ldquo;Types&rdquo;</span>
            </a>
            <ul>
              <li>
                <a href="#tipos-basicos-ts-number">
                  <span>Number</span>
                </a>
              </li>
              <li>
                <a href="#tipos-basicos-ts-string">
                  <span>String</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  );

  // TODO: The style of the <p> inside the <HeaderCredits> component has to be defined on the stylesheet of that component, not on the stylesheet of this page.
  return (
    <>
      <Head>
        <title>Web Development notes: TypeScript - JM2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.MainContainer} ref={mainContainer}>
        <LeftPanel additionalStyles={styles.LeftPanel} />
        <CorePanel additionalStyles={styles.CorePanel}>
          <HeaderCredits>
            <p className={styles.creditsText}>Blablablablbalba</p>
          </HeaderCredits>
          <h1>TypeScript</h1>
          <section id="que-es-ts">
            <h1>&iquest;Qu&eacute; es TypeScript?</h1>
            <p>
              TypeScript es un <em> superset </em> de JavaScript: un lenguaje de
              programaci&oacute;n construido sobre otro (JS), el cual lo mejora
              y a&ntilde;ade nuevas caracter&iacute;sticas: posibilita la
              escritura de un c&oacute;digo m&aacute;s limpio (m&aacute;s bien
              &ldquo;fuerza&rdquo; al programador a hacerlo), potente y con
              menos posibilidades de contener fallos.
            </p>
            <p>
              Sin embargo TypeScript tiene una desventaja importante, y es que
              no puede ser ejecutado por entornos en los que JavaScript
              s&iacute; puede ser ejecutado sin mayor problema: tales entornos
              pueden ser los propios navegadores de internet o aqu&eacute;llos
              en los que se ejecuta Node.js. Para superar dicho problema,
              TypeScript tambi&eacute;n es un compilador (es decir, no es
              solamente un <em> superset </em> de JS) que transforma el
              c&oacute;digo que hayamos creado en TS a c&oacute;digo de JS.
            </p>
            <p>(FOTO)</p>
            <p>
              Adicionalmente, TypeScript a&ntilde;ade los &ldquo;types&rdquo;,
              lo cual obliga a especificar el tipo de dato con el que queremos
              lidiar en el propio c&oacute;digo y, por tanto, evitar errores en
              los que, por ejemplo, estemos utilizando <em> strings </em> cuando
              en realidad queremos utilizar n&uacute;meros.
            </p>
            <p>(FOTO)</p>
            <section id="mejoras-ts-js">
              <h2>
                &iquest;Qu&eacute; mejoras a&ntilde;ade TypeScript frente al uso
                de JavaScript?
              </h2>
              <p>(FOTO)</p>
            </section>
          </section>
          <section id="instalar-ts">
            <h1>Instalar y utilizar TypeScript</h1>
            <p>
              Se ha de instalar TypeScript como si fuera un paquete de Node.js:
              en la consola de comandos de Windows escribimos el siguiente
              comando, tal y como se especifica en la{' '}
              <a href="https://www.typescriptlang.org/">
                {' '}
                p&aacute;gina oficial de TypeScript{' '}
              </a>{' '}
              :
            </p>
            <p>
              <strong> npm install -g typescript </strong>
            </p>
            <section id="compilar-ts">
              <h2>Compilar c&oacute;digo TS a JS</h2>
              <p>
                Una vez con dicho paquete instalado de manera global en nuestro
                ordenador, el cual incluye el lenguaje en s&iacute; pero
                tambi&eacute;n el compilador para pasar c&oacute;digo TS a JS,
                para hacer uso de dicho compilador habremos de realizar lo
                siguiente:
              </p>
              <p>
                En la consola de comandos de Windows,{' '}
                <u> dentro de la carpeta donde se encuentra el archivo .ts </u>{' '}
                que queremos compilar a c&oacute;digo JS, escribir el siguiente
                comando, tal y como se especifica en la{' '}
                <a href="https://www.typescriptlang.org/">
                  {' '}
                  p&aacute;gina oficial de TypeScript{' '}
                </a>{' '}
                :
              </p>
              <p>
                <strong> tsc nombreDelArchivoEnC&oacute;digoTS.ts </strong>
              </p>
              <p>
                Ser&aacute; el archivo .js resultante el que habremos de
                importar en el archivo HTML o donde sea que lo queramos
                utilizar, y NO el archivo .ts .
              </p>
            </section>
          </section>
          <section id="types-ts">
            <h1>Types</h1>
            <p>
              M&aacute;s informaci&oacute;n:{' '}
              <a href="https://www.typescriptlang.org/docs/handbook/basic-types.html">
                {' '}
                https://www.typescriptlang.org/docs/handbook/basic-types.html{' '}
              </a>
            </p>
            <p>
              En TypeScript hay varios tipos de datos (&ldquo;Types&rdquo;), tal
              y como ocurre en JavaScript: number, string, boolean (en este
              &uacute;ltimo caso, TypeScript no trata a los valores{' '}
              <em> truthy </em> y <em> falsy </em> como booleanos)&hellip; De
              hecho, en TypeScript existen m&aacute;s tipos de datos que en el
              propio JavaScript, tal y como se indica m&aacute;s adelante.
            </p>
            <p>(FOTO)</p>
            <p>
              Una de las ventajas que ofrece TS frente a JS est&aacute; en la
              manera en que &ldquo;obliga&rdquo; al desarrollador a especificar
              los tipos e datos que est&aacute; utilizando para as&iacute;,
              poder indicar f&aacute;cilmente cualquier posible inconsistencia
              en el c&oacute;digo que pudiera dar lugar a error (por ejemplo,
              mezclar <em> strings </em> con n&uacute;meros en operaciones
              aritm&eacute;ticas). Es decir, TS es un lenguaje de &ldquo;tipos
              est&aacute;ticos&rdquo; mientras que JS es un lenguaje de
              &ldquo;tipos din&aacute;micos&rdquo;.
            </p>
            <p>(FOTO)</p>
            <p>
              Para declarar el tipo de dato de alguna variable que estemos
              utilizando, se han de utilizar los dos puntos (&ldquo;{' '}
              <strong> : </strong> &rdquo;) justo detr&aacute;s de la variable
              y, a continuaci&oacute;n, <strong> el tipo de dato </strong> en
              que consiste dicha variable (n&uacute;mero, booleano&hellip;) el
              cual habr&aacute; de{' '}
              <strong>
                {' '}
                <u> indicarse SIEMPRE en min&uacute;sculas </u>{' '}
              </strong>{' '}
              , como en el siguiente ejemplo:
            </p>
            <p>
              variable <strong> : number </strong>
            </p>
            <p>
              <strong> (FOTO) </strong>
            </p>
            <p>
              As&iacute;, siguiendo el anterior ejemplo, si a alg&uacute;n
              argumento de dicha funci&oacute;n no le aplic&aacute;ramos
              alg&uacute;n n&uacute;mero sino una string, la consola de comandos
              nos lanzar&iacute;a un error al compilar el archivo .ts a .js:
            </p>
            <p>(FOTO)</p>
            <p>
              Adicionalmente, el propio IDE nos avisa del error antes de tan
              siquiera compilar:
            </p>
            <p>(FOTO)</p>
            <section id="type-inference">
              <h2>Type inference</h2>
              <p>
                Solamente es necesario indicar el tipo de dato ( <em> type </em>{' '}
                ) en aquellas variables que, en su creaci&oacute;n, no se le ha
                dado ning&uacute;n valor que permita a TypeScript deducir /
                asignarle un tipo de valor en concreto (lo que se conoce como{' '}
                <em> type inference </em> ), tal y como ocurre en el ejemplo del
                apartado anterior, donde a los par&aacute;metros de la
                funci&oacute;n se le han de indicar los &ldquo;types&rdquo;.
              </p>
              <p>Otro ejemplo:</p>
              <p>(FOTO)</p>
              <p>
                Indicar el &ldquo;type&rdquo; en la variable de la{' '}
                <strong>
                  {' '}
                  <u> l&iacute;nea 7 </u>{' '}
                </strong>{' '}
                es redundante, innecesario y se considera mala pr&aacute;ctica.
                TypeScript ya sabe que el tipo de dato de dicha variable es
                &ldquo;number&rdquo;, pues el valor que se le ha asignado en su
                creaci&oacute;n es un dato de tipo n&uacute;mero. La variable de
                la{' '}
                <strong>
                  {' '}
                  <u> l&iacute;nea 15 </u>{' '}
                </strong>{' '}
                s&iacute; que se ha declarado correctamente sin indicar el tipo
                de dato debido a dicho motivo.
              </p>
              <p>
                En la variable de la{' '}
                <strong>
                  {' '}
                  <u> l&iacute;nea 9 </u>{' '}
                </strong>{' '}
                S&Iacute; que es pertinente indicar el tipo de dato (a pesar de
                que en el ejemplo, al ser tan sencillo, pueda ser innecesario).
                Ello se debe a que en el momento de creaci&oacute;n de la
                variable (l&iacute;nea 9) no se le hab&iacute;a asignado
                ning&uacute;n valor que permitiera a TS deducir el tipo de dato
                que contiene dicha variable. Lo mismo ocurre con la variable de
                la{' '}
                <strong>
                  {' '}
                  <u> l&iacute;nea 12 </u>{' '}
                </strong>{' '}
                , la cual da lugar a error porque el nuevo tipo de dato dado en
                la nueva invocaci&oacute;n de la variable (l&iacute;nea 13) no
                corresponde con el tipo de dato asignado en su creaci&oacute;n.
              </p>
            </section>
            <section id="tipos-basicos-ts">
              <h2>Tipos b&aacute;sicos de &ldquo;Types&rdquo;</h2>
              <section id="tipos-basicos-ts-number">
                <h3>Number</h3>
                <p>
                  Se especifica indicando &ldquo; <strong> : number </strong>{' '}
                  &rdquo; (tal cual, en min&uacute;sculas).
                </p>
                <p>(FOTO)</p>
              </section>
              <section id="tipos-basicos-ts-string">
                <h3>String</h3>
                <p>
                  Se especifica indicando &ldquo; <strong> : string </strong>{' '}
                  &rdquo; (tal cual, en min&uacute;sculas).
                </p>
                <p>(FOTO)</p>
              </section>
            </section>
          </section>
        </CorePanel>
        <RightPanel additionalStyles={styles.RightPanel}>
          <div ref={indexContainer}>{index}</div>
        </RightPanel>
      </main>
      <NavBarBottom />
    </>
  );
}
