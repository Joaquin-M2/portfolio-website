"use client";

import { useEffect, useRef } from "react";

import styles from "./skillBar.module.scss";

interface SkillBarProps {
  children?: JSX.Element | JSX.Element[];
  color?: "red" | "blue" | "orange";
  href: string;
  isSubLevelWithChild?: boolean;
  isSubLevel?: boolean;
  progressPercentage: number;
  title: string;
}

export default function SkillBar({
  children,
  color = "red",
  href,
  isSubLevelWithChild,
  isSubLevel,
  progressPercentage,
  title,
}: SkillBarProps) {
  const percentageRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    progressPercentage >= 80 &&
      percentageRef.current.animate(
        [
          {
            color: "black",
          },
          {
            color: "white",
          },
        ],
        {
          duration: 1000,
          fill: "forwards",
        }
      );

    barRef.current.animate(
      [
        {
          width: "0%",
          backgroundColor: "red",
          animationTimingFunction: "cubic-bezier(0.8, 0.46, 0.84, 0.82)",
        },
        {
          width: "50%",
          backgroundColor: "yellow",
          animationTimingFunction: "cubic-bezier(0.28, 0.89, 0.77, 0.97)",
        },
        {
          width: `${progressPercentage}%`,
          backgroundColor: `${mix(
            "ffff00",
            "008000",
            (100 - +progressPercentage) * 2
          )}`,
        },
      ],
      {
        duration: 1500,
        fill: "forwards",
        //easing: "cubic-bezier(0.8, 0.46, 0.84, 0.82)",
      }
    );
  }, []);

  let animationLength = 2;

  let i = 0;
  const move = () => {
    if (i === 0) {
      i = 1;
      let percentage = 0;
      const frame = () => {
        if (percentage >= progressPercentage) {
          clearInterval(id);
          i = 0;
        } else {
          percentage++;
          if (percentageRef.current) {
            percentageRef.current.textContent = percentage + "%";
          } else {
            return;
          }
        }
      };
      let id = setInterval(frame, animationLength * 10);
    }
  };

  move();

  // MIX COLORS FUNCTION (like "mix()" in Sass)
  // Credits: https://gist.github.com/jedfoster/7939513

  const mix = (color_1, color_2, weight) => {
    function d2h(d) {
      return d.toString(16);
    } // convert a decimal value to hex
    function h2d(h) {
      return parseInt(h, 16);
    } // convert a hex value to decimal

    weight = typeof weight !== "undefined" ? weight : 50; // set the weight to 50%, if that argument is omitted

    let color = "#";

    for (let i = 0; i <= 5; i += 2) {
      // loop through each of the 3 hex pairs—red, green, and blue
      let v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
        v2 = h2d(color_2.substr(i, 2)),
        // combine the current pairs from each source color, according to the specified weight
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

      while (val.length < 2) {
        // prepend a '0' if val results in a single digit
        val = "0" + val;
      }

      color += val; // concatenate val to our new color string
    }

    return color; // PROFIT!
  };

  return (
    <>
      <div className={styles.wrapper}>
        <a
          className={`
          ${styles.anchor}
        ${isSubLevel && styles.isSubLevel} 
        ${isSubLevelWithChild && styles.isSubLevelWithChild}
        `}
          target="_blank"
          href={href}
        >
          <div className={styles.Container}>
            <span
              className={`${styles.TechTag} ${
                color === "blue" && styles.TechTagBlue
              } ${color === "orange" && styles.TechTagOrange}`}
            >
              {title}
            </span>
            <div
              className={`${styles.ProgressBarContainer} ${
                color === "blue" && styles.ProgressBarContainerBlue
              } ${color === "orange" && styles.ProgressBarContainerOrange}`}
            >
              <p className={styles.PercentageQuantity} ref={percentageRef}></p>
              <div className={styles.progressBar} ref={barRef}></div>
            </div>
          </div>
        </a>
        {children && <div className={styles.childrenWrapper}>{children}</div>}
      </div>
    </>
  );
}
