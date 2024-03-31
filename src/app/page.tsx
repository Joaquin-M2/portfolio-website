"use client";

import NavBarButton from "@/components/NavBar/NavBarButton/NavBarButton";

import styles from "./page.module.scss";
import { useEffect, useRef } from "react";
//import { useRouter } from "next/navigation";

export default function Page() {
  //const router = useRouter();
  const dropsWrap = useRef(null);

  let backgroundDrops = [];
  for (let i = 0; i < 5; i++) {
    backgroundDrops.push(
      <div className={styles.binaryDropLine} key={backgroundDrops.length}>
        <p>
          01010000011010010110111001100101011000010111000001110000011011000110010100100000011100000110100101111010011110100110000100100000011010010111001100100000011101000110100001100101001000000110001001100101011100110111010000101110
        </p>
      </div>
    );
  }
  useEffect(() => {
    ///////////////////////////////////////////////////////////////
    // RANDOM VERTICAL LINES WITH BINARY CODE IN THE BACKGROUND

    const dropAnimationDuration = 15;
    const binaryNumbersSizeAnimation = 10;

    const allDivFromDropsAnimation = dropsWrap.current.querySelectorAll("div");
    const allPFromDropsAnimation = dropsWrap.current.querySelectorAll("p");

    const dropsLeftPosition = [];

    function randomPosition() {
      allDivFromDropsAnimation.forEach((div) => {
        let newRandomLeftPosition = Math.random() * 100;
        if (
          dropsLeftPosition.length >= 1 &&
          dropsLeftPosition.find(
            (elem) => Math.abs(elem - newRandomLeftPosition) < 3.5
          )
        ) {
          while (
            dropsLeftPosition.find(
              (elem) => Math.abs(elem - newRandomLeftPosition) < 3.5
            )
          ) {
            newRandomLeftPosition += 5;
            if (newRandomLeftPosition >= 95) {
              newRandomLeftPosition -= 90;
            }
          }
          dropsLeftPosition.push(newRandomLeftPosition);
        } else {
          if (newRandomLeftPosition >= 95) {
            newRandomLeftPosition -= 90;
            while (
              dropsLeftPosition.find(
                (elem) => Math.abs(elem - newRandomLeftPosition) < 3.5
              )
            ) {
              newRandomLeftPosition += 5;
              if (newRandomLeftPosition >= 95) {
                newRandomLeftPosition -= 90;
              }
            }
          }
          dropsLeftPosition.push(newRandomLeftPosition);
        }

        div.style.left = `${dropsLeftPosition[dropsLeftPosition.length - 1]}%`;
        if (dropsLeftPosition.length >= 5) {
          dropsLeftPosition.splice(0);
        }
      });
      allDivFromDropsAnimation.forEach(
        (div) => (div.style.marginTop = `-${Math.random() * 20}rem`)
      );
    }

    randomPosition();

    allDivFromDropsAnimation.forEach(
      (div) => (div.style.animationDuration = `${dropAnimationDuration}s`)
    );
    allPFromDropsAnimation.forEach(
      (p) => (p.style.fontSize = `${binaryNumbersSizeAnimation}px`)
    );

    /* const randomMarginGeneration = setInterval(() => {
      randomPosition();
    }, 1000 * dropAnimationDuration);

    return () => {
      // Stop the "setInterval()" - "binaryNumbersGeneration" function execution as soon the URL changes.
      router.events.off("routeChangeStart", () => {
        clearInterval(randomMarginGeneration);
      });
    }; */
  }, []);

  return (
    <>
      <div className={styles.wrap} ref={dropsWrap}>
        {backgroundDrops}
      </div>
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
