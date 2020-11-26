import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import styles from './breakout-game.module.scss';

import BG_ShowRulesSidebar from '../../../../components/labs/breakout-game/show-rules-sidebar/show-rules-sidebar';
import BG_Title from '../../../../components/labs/breakout-game/title/title';
import BG_Canvas from '../../../../components/labs/breakout-game/canvas/canvas';

import TonguesContainer from '../../../../components/common/tongues-container/tonguesContainer';

const BreakoutGame: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // GLOBAL VARIABLES

    const BRICKS_PER_ROW = 9;
    const BRICKS_PER_COLUMN = 5;

    let bricks = [];
    let score = 0;

    // PROPERTIES OF SHAPES TO BE DRAWN

    const ballProperties = {
      xAxisPosition: canvas.width / 2,
      yAxisPosition: canvas.height / 2,
      radiusSize: canvas.width / 100,
      //speed: 4,
      directionX: canvas.height / 110,
      directionY: -canvas.height / 110,
    };

    const paddleProperties = {
      xAxisPosition: canvas.width / 2.2,
      yAxisPosition: canvas.height / 1.05,
      width: canvas.width / 10,
      height: canvas.width / 100,
      speed: canvas.width / 90,
      directionX: 0,
    };

    const brickProperties = {
      width: canvas.width / 11.5,
      height: canvas.height / 30,
      padding: canvas.width / 100,
      xAxisPositionReference: canvas.width / 15,
      yAxisPositionReference: canvas.height / 7,
      visible: true,
    };

    // Create and position all the bricks per row & column --> Update global variable "bricks" with
    // nested arrays: columns > rows > object per brick
    for (let i = 0; i < BRICKS_PER_ROW; i++) {
      bricks[i] = [];
      for (let j = 0; j < BRICKS_PER_COLUMN; j++) {
        const x =
          i * (brickProperties.width + brickProperties.padding) +
          brickProperties.xAxisPositionReference;
        const y =
          j * (brickProperties.height + brickProperties.padding) +
          brickProperties.yAxisPositionReference;
        bricks[i][j] = {
          x,
          y,
          ...brickProperties,
        };
      }
    }

    // FUNCTIONS FOR DRAWING ON CANVAS

    function drawBall() {
      ctx.beginPath();
      ctx.arc(
        ballProperties.xAxisPosition,
        ballProperties.yAxisPosition,
        ballProperties.radiusSize,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleProperties.xAxisPosition,
        paddleProperties.yAxisPosition,
        paddleProperties.width,
        paddleProperties.height
      );
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }

    function drawText() {
      ctx.font = `${canvas.width / 40}px Arial`;
      ctx.fillText(`Score: ${score}`, canvas.width * 0.88, canvas.height / 12);
    }

    function drawBricks() {
      bricks.forEach(column => {
        column.forEach(brick => {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fillStyle = brick.visible ? 'red' : 'transparent';
          ctx.fill();
          ctx.closePath();
        });
      });
    }

    function drawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the old position of elements in canvas. Otherwise, elements will "stretch".

      drawBall();
      drawPaddle();
      drawText();
      drawBricks();
    }

    // UPDATING - ANIMATING THE CANVAS

    // const ballProperties = {
    //     xAxisPosition: canvas.width / 2,
    //     yAxisPosition: canvas.height / 2,
    //     radiusSize: 10,
    //     speed: 4,
    //     directionX: 4,
    //     directionY: -4,
    // };

    function moveBall() {
      ballProperties.xAxisPosition += ballProperties.directionX;
      ballProperties.yAxisPosition += ballProperties.directionY;

      // Create canvas border limits
      if (
        ballProperties.yAxisPosition - ballProperties.radiusSize < 0 ||
        ballProperties.yAxisPosition + ballProperties.radiusSize > canvas.height
      ) {
        ballProperties.directionY *= -1;
      } else if (
        ballProperties.xAxisPosition + ballProperties.radiusSize >
          canvas.width ||
        ballProperties.xAxisPosition - ballProperties.radiusSize < 0
      ) {
        ballProperties.directionX *= -1;
      }

      // Create paddle limits for collision
      if (
        ballProperties.yAxisPosition + ballProperties.radiusSize >
          paddleProperties.yAxisPosition &&
        ballProperties.xAxisPosition - ballProperties.radiusSize >
          paddleProperties.xAxisPosition &&
        ballProperties.xAxisPosition + ballProperties.radiusSize <
          paddleProperties.xAxisPosition + paddleProperties.width
      ) {
        ballProperties.directionY *= -1;
      }

      // Break bricks
      bricks.forEach(column =>
        column.forEach(brick => {
          if (brick.visible) {
            if (
              ballProperties.yAxisPosition - ballProperties.radiusSize <
                brick.y + brick.height &&
              ballProperties.yAxisPosition + ballProperties.radiusSize >
                brick.y &&
              ballProperties.xAxisPosition > brick.x &&
              ballProperties.xAxisPosition < brick.x + brick.width
            ) {
              ballProperties.directionY *= -1;
              brick.visible = false;
              score++;
              nextLevel(); // Function define some lines below.
            }
          }
        })
      );

      // Lose and restart game
      if (
        ballProperties.yAxisPosition + ballProperties.radiusSize >
        canvas.height
      ) {
        restart(); // Function define some lines below.
        score = 0;
      }
    }

    function restart() {
      bricks.forEach(column =>
        column.forEach(brick => {
          brick.visible = true;
        })
      );
    }

    function nextLevel() {
      if (score / (BRICKS_PER_ROW * BRICKS_PER_COLUMN) === 1) {
        restart();
      }
    }

    function movePaddle() {
      paddleProperties.xAxisPosition += paddleProperties.directionX;

      // Create canvas border limits
      if (
        paddleProperties.xAxisPosition >
        canvas.width - paddleProperties.width
      ) {
        paddleProperties.xAxisPosition = canvas.width - paddleProperties.width;
      } else if (paddleProperties.xAxisPosition < 0) {
        paddleProperties.xAxisPosition = 0;
      }
    }

    function updateCanvas() {
      moveBall();

      movePaddle();

      drawShapes();

      requestAnimationFrame(updateCanvas); // Sets the moment at which the canvas has to be updated.
    }

    updateCanvas();

    // EVENT LISTENERS
    // Credits: https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks

    // Update the paddle position

    function keyDown(event) {
      if (event.key === 'ArrowRight' || event.key === 'Right') {
        paddleProperties.directionX = paddleProperties.speed;
      } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
        paddleProperties.directionX = -paddleProperties.speed;
      }
    }

    function keyUp(event) {
      if (
        event.key === 'ArrowRight' ||
        event.key === 'Right' ||
        event.key === 'ArrowLeft' ||
        event.key === 'Left'
      ) {
        paddleProperties.directionX = 0;
      }
    }

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  return (
    <>
      <Head>
        <title>Portfolio JM2: Labs - Breakout game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.Container}>
        <BG_Title>Breakout Game!</BG_Title>
        <BG_Canvas ref={canvasRef} />
        <BG_ShowRulesSidebar />
      </div>
      <TonguesContainer CheckCodePath="https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/breakout-game/index.tsx" />
    </>
  );
};

export default BreakoutGame;
