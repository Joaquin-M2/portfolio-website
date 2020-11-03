import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './pf-slider.module.scss';

import ResponsivePicture from '../../../common/responsive-picture/responsive-picture';

export default function PortfolioSlider(props) {
    ///////////////////
    // TOUCH SLIDER
    // Credits: https://codepen.io/cconceicao/pen/PBQawy

    const slider = useRef();

    const dragStartHandler = useRef();
    const dragEndHandler = useRef();
    const dragActionHandler = useRef();

    let slidedToLeft = true;
    const fadeOldSlideCSS = styles.OldSlide;
    const appearNewSlideCSSFromRight = styles.NewSlideFromRight;
    const appearNewSlideCSSFromLeft = styles.NewSlideFromLeft;

    const { activeThumbnail, prevProject, nextProject } = props;

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
                return new Promise(function (resolve) {
                    slider.current.classList.add(fadeOldSlideCSS);
                    resolve();
                });
            }

            function changeSlide() {
                return new Promise(function (resolve) {
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
                return new Promise(function (resolve) {
                    if (slidedToLeft) {
                        slider.current.classList.add(
                            appearNewSlideCSSFromRight
                        );
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
    }, [activeThumbnail]);

    return (
        <>
            <div
                className={`${styles.Slider} ${props.additionalStyles}`}
                ref={slider}
                onTouchStart={() => dragStartHandler.current()}
                onTouchMove={() => dragActionHandler.current()}
                onTouchEnd={() => dragEndHandler.current()}
            >
                <div className={styles.ImageContainer}>
                    <ResponsivePicture
                        nameOfClass={styles.Image}
                        path={props.srcAttribute}
                    />
                    {/* <img className={styles.Image} src={props.srcAttribute} /> */}
                    <input
                        className={styles.CurtainCheckbox}
                        type="checkbox"
                        id="curtain"
                        name="slider-curtain"
                    />
                    <label className={styles.CurtainButton} htmlFor="curtain">
                        <div className={styles.CurtainButtonContent}>
                            Details
                        </div>
                    </label>
                    <div className={styles.Curtain}>
                        <div className={styles.CurtainRelativeContainer}>
                            <ul className={styles.CurtainDetails}>
                                {props.children}
                            </ul>
                        </div>
                        <a
                            className={styles.CurtainDetails_CheckCodeLink}
                            href={props.checkTheCode}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {'>>'} Click here to check the code {'<<'}
                        </a>
                    </div>
                </div>
                <div className={styles.Description}>
                    <h4 className={styles.Description_Title}>
                        {props.projectTitle}
                    </h4>
                    <div className={styles.Description_TextContainer}>
                        <p className={styles.Description_Text}>
                            {props.projectDescription}
                        </p>
                    </div>
                    <Link href={props.checkTheProject}>
                        <a>
                            <button
                                className={
                                    styles.Description_ButtonCheckProject
                                }
                            >
                                Check the Project
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}
