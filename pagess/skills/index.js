import Router from "next/router";
import {useEffect} from 'react';
import Head from 'next/head';
// import NavBarBottom from '../../components/nav-bar-bottom/nav-bar-bottom';

// import styles from './portfolio.module.scss';

export default function Skills() {
  useEffect(() => {
    if (Router.pathname === '/skills' ) {
        Router.push('/skills/frontend')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Skills - JM2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={styles.MainContainer}>
        <nav className={styles.TopNavBar}>
            <NavBarTopButton link="/skills/frontend">Front-End</NavBarTopButton>
            <NavBarTopButton link="/skills/devops">DevOps</NavBarTopButton>
            <NavBarTopButton link="/skills/backend">Back-End</NavBarTopButton>
        </nav>
      </main>
      <NavBarBottom /> */}
    </>
  )
}