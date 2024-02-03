"use client";

import NavBarButton from "@/components/NavBar/NavBarButton/NavBarButton";

import styles from "./page.module.scss";

export default function Page() {
  return (
    <>
      {/* <div className={styles.wrap} ref={dropsWrap}>
        {backgroundDrops}
      </div> */}
      <div className={styles.wrap}></div>
      <div className={styles.positionMainElements}>
        <main className={styles.container}>
          <div className={styles.title}>
            <h1 className={styles.welcome} data-cy="home-heading">
              Welcome to Joaquín M2's Website
            </h1>
            <h2 className={styles.position}>Full-Stack Web Developer</h2>
          </div>
          <div className={styles.questionAnswer}>
            <p className={styles.question}>
              Do you need a ninja-level web developer for your project?
            </p>
            <p className={styles.answer}>
              If so, have a look at{" "}
              <NavBarButton
                href="/portfolio/projects"
                pathnameStartsWith="/portfolio"
              >
                my portfolio
              </NavBarButton>{" "}
              and{" "}
              <NavBarButton href="/contact" pathnameStartsWith="/contact">
                drop me a line
              </NavBarButton>{" "}
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
