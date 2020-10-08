import styles from './skill-bar.module.scss';

import {useRef} from 'react';


export default function SkillBar(props) {

    const percentageRef = useRef();

    let animationLength = 2;

    let i = 0;
    const move = () => {
        if (i === 0) {
            i = 1;
            let percentage = 0;
            let id = setInterval(frame, animationLength * 10);
            function frame() {
                if (percentage >= props.progressPercentage) {
                    clearInterval(id);
                    i = 0;
                } else {
                    percentage++;
                    if (percentageRef.current) {
                        percentageRef.current.textContent = percentage + '%';
                    } else {
                        return;
                    }
                }
            }
        }
    }

    move()


    // MIX COLORS FUNCTION (like "mix()" in Sass)
    // Credits: https://gist.github.com/jedfoster/7939513

    const mix = (color_1, color_2, weight) => {
        function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
        function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal 
      
        weight = (typeof weight !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted
      
        let color = "#";
      
        for(let i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
            let v1 = h2d(color_1.substr(i, 2)), // extract the current pairs
                v2 = h2d(color_2.substr(i, 2)),
                
                  // combine the current pairs from each source color, according to the specified weight
                  val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0))); 
      
            while(val.length < 2) { // prepend a '0' if val results in a single digit
                val = '0' + val; 
            } 
          
            color += val; // concatenate val to our new color string
        }
        
        return color; // PROFIT!
      };

    return (
        <>
        <div className={styles.Container}>
            <span className={styles.TechTag}>
                {props.children}
            </span>
            <div className={styles.ProgressBarContainer}>
                <p className={styles.PercentageQuantity} ref={percentageRef}>
                    {/* {'123' + '%'} */}
                </p>
                <div className={styles.ProgressBar}>
                    <style jsx>{`
                        div {
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 100%;
                        
                            animation: progressBar ${animationLength}s forwards;
                        }
                        
                        @keyframes progressBar {
                            0% {
                                width: 0%;
                                background-color: red;
                                animation-timing-function: cubic-bezier(.8,.46,.84,.82);
                            }
                        
                            50% {
                                width: 50%;
                                background-color: yellow;
                                animation-timing-function: cubic-bezier(.28,.89,.77,.97);
                            }
                        
                            100% {
                                width: ${props.progressPercentage}%;
                                background-color: ${mix('ffff00', '008000', (100 - +props.progressPercentage) * 2)};
                            }
                        }
                    `}</style>
                </div>
            </div>
        </div>
        
      </>
    )
}