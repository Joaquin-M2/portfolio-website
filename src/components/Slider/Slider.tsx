"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import Image, { StaticImageData } from "next/image";

import styles from "./slider.module.scss";

interface SliderProps {
  activeThumbnail: string | number;
  additionalStyles?: string;
  children: JSX.Element | JSX.Element[] | string | string[];
  imageSrc: string | StaticImageData;
  liveProjectLink: string;
  nextProject: () => void;
  prevProject: () => void;
  projectDescription: string;
  projectTitle: string;
  repositoryLink: string;
}

export default function Slider({
  activeThumbnail,
  additionalStyles,
  children,
  imageSrc,
  liveProjectLink,
  nextProject,
  prevProject,
  projectDescription,
  projectTitle,
  repositoryLink,
}: SliderProps) {
  const previousActiveThumbnail = useRef<number>(+activeThumbnail);

  ///////////////////
  // TOUCH SLIDER
  // Credits: https://codepen.io/cconceicao/pen/PBQawy

  const slider = useRef<HTMLDivElement>();

  const dragStartHandler = useRef<Function>();
  const dragEndHandler = useRef<Function>();
  const dragActionHandler = useRef<Function>();

  let slidedToLeft = true;
  const fadeOldSlideCSS = styles.OldSlide;
  const appearNewSlideCSSFromRight = styles.NewSlideFromRight;
  const appearNewSlideCSSFromLeft = styles.NewSlideFromLeft;

  useEffect(() => {
    let posInitial,
      posFinal,
      threshold = 50,
      pageXCoords = [];

    dragStartHandler.current = dragStart;
    dragEndHandler.current = dragEnd;
    dragActionHandler.current = dragAction;

    function dragStart(e) {
      e = e || window.event;
      posInitial = e.touches[0].pageX;

      slider.current.classList.remove(fadeOldSlideCSS);
      slider.current.classList.remove(
        appearNewSlideCSSFromRight,
        appearNewSlideCSSFromLeft
      );
    }

    function dragAction(e) {
      e = e || window.event;
      pageXCoords.push(e.touches[0].pageX);
      slider.current.style.transform = `translateX(${
        (posInitial - e.touches[0].pageX) * -1
      }px)`;
    }

    async function dragEnd() {
      posFinal = pageXCoords[pageXCoords.length - 1];

      function fadeOldSlide() {
        return new Promise<void>(function (resolve) {
          slider.current.classList.add(fadeOldSlideCSS);
          resolve();
        });
      }

      function changeSlide() {
        return new Promise<void>(function (resolve) {
          setTimeout(() => {
            slider.current.style.transform = `translateX(${0}px)`;
            if (posFinal - posInitial > 0) {
              shiftSlide(-1);
            } else if (posFinal - posInitial < 0) {
              shiftSlide(1);
            }
            resolve();
          }, 300);
        });
      }

      function showNewSlide() {
        return new Promise<void>(function (resolve) {
          if (slidedToLeft) {
            slider.current.classList.add(appearNewSlideCSSFromRight);
          } else {
            slider.current.classList.add(appearNewSlideCSSFromLeft);
          }
          resolve();
        });
      }

      if (Math.abs(posFinal - posInitial) > threshold) {
        await fadeOldSlide();
        await changeSlide();
        await showNewSlide();
      } else {
        slider.current.style.transform = `translateX(${0}px)`;
      }

      pageXCoords = [];
    }

    function shiftSlide(dir) {
      if (dir == -1) {
        prevProject();
        slidedToLeft = false;
      } else if (dir == 1) {
        nextProject();
        slidedToLeft = true;
      }
    }

    if (!isTouchDevice()) {
      if (+activeThumbnail > previousActiveThumbnail.current) {
        slider.current.classList.add(styles.NewSlideFromRight);
        setTimeout(
          () => {
            slider.current.classList.remove(styles.NewSlideFromRight);
          },
          600 // The CSS animation duration.
        );
      } else if (+activeThumbnail < previousActiveThumbnail.current) {
        slider.current.classList.add(styles.NewSlideFromLeft);
        setTimeout(
          () => {
            slider.current.classList.remove(styles.NewSlideFromLeft);
          },
          600 // The CSS animation duration.
        );
      }
    }

    previousActiveThumbnail.current = +activeThumbnail;
  }, [activeThumbnail]);

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  return (
    <>
      <div
        data-testid="sliderDiv"
        className={`${styles.Slider} ${additionalStyles}`}
        ref={slider}
        onTouchStart={() => dragStartHandler.current()}
        onTouchMove={() => dragActionHandler.current()}
        onTouchEnd={() => dragEndHandler.current()}
      >
        <div className={styles.ImageContainer}>
          <Image
            className={styles.Image}
            src={
              `${imageSrc}-medium.jpg` ||
              `${imageSrc}-small.jpg` ||
              `${imageSrc}.jpg` ||
              imageSrc
            }
            alt={`Preview image of ${projectTitle}.`}
            fill
          />
          <input
            className={styles.CurtainCheckbox}
            type="checkbox"
            id="curtain"
            name="slider-curtain"
          />
          <label className={styles.CurtainButton} htmlFor="curtain">
            <div className={styles.CurtainButtonContent}>Details</div>
          </label>
          <div className={styles.Curtain}>
            <div className={styles.CurtainRelativeContainer}>
              <ul className={styles.CurtainDetails}>{children}</ul>
            </div>
            <a
              className={styles.CurtainDetails_CheckCodeLink}
              href={repositoryLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {">>"} Click here to check the code {"<<"}
            </a>
          </div>
        </div>
        <div className={styles.Description}>
          <h4 className={styles.Description_Title}>{projectTitle}</h4>
          <div className={styles.Description_TextContainer}>
            <p className={styles.Description_Text}>{projectDescription}</p>
          </div>
          <Link href={liveProjectLink}>
            <button className={styles.Description_ButtonCheckProject}>
              Check the Project
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
