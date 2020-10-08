import Router from "next/router";
import Head from 'next/head';
import {useEffect} from 'react';
// import NavBarBottom from '../../components/nav-bar-bottom/nav-bar-bottom';
// import PortfolioFiltersBar from '../../components/pf-filters-bar/pf-filters-bar';

// import styles from './portfolio.module.scss';

export default function Portfolio() {
  useEffect(() => {
    if (Router.pathname === '/portfolio' ) {
        Router.push('/portfolio/projects')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Portfolio - JM2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/* <PortfolioFiltersBar /> */}
        {/* <main className={styles.container}>
          <h1 className={styles.welcome}>Welcome to Joaquín M2’s Website</h1>
          <h2 className={styles.position}>Full-Stack Web Developer</h2>
          <p className={styles.question}>Do you need a ninja-level web developer for your project?</p>
          <p className={styles.answer}>If so, have a look at my portfolio and drop me a line.</p>
        </main> */}
        {/* <footer>
        </footer> */}
        {/* <NavBarBottom /> */}
    </>
  )
}
