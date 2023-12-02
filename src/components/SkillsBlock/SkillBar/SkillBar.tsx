"use client";

import { useRef } from "react";

import styles from "./skillBar.module.scss";

interface SkillBarProps {
  children: string;
  progressPercentage: number;
}

export default function SkillBar({
  children,
  progressPercentage,
}: SkillBarProps) {
  const percentageRef = useRef<HTMLParagraphElement>(null);

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

  const uuid = crypto.randomUUID();

  return (
    <>
      <div className={styles.Container}>
        <span className={styles.TechTag}>{children}</span>
        <div className={styles.ProgressBarContainer}>
          <p className={styles.PercentageQuantity} ref={percentageRef}>
            {/* {'123' + '%'} */}
          </p>
          <div>
            <style jsx>{`
              div {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;

                animation: progressBar-${uuid} ${animationLength}s forwards;
              }

              @keyframes progressBar-${uuid} {
                0% {
                  width: 0%;
                  background-color: red;
                  animation-timing-function: cubic-bezier(
                    0.8,
                    0.46,
                    0.84,
                    0.82
                  );
                }

                50% {
                  width: 50%;
                  background-color: yellow;
                  animation-timing-function: cubic-bezier(
                    0.28,
                    0.89,
                    0.77,
                    0.97
                  );
                }

                100% {
                  width: ${progressPercentage}%;
                  background-color: ${mix(
                    "ffff00",
                    "008000",
                    (100 - +progressPercentage) * 2
                  )};
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}
