import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useRef, useMemo, useState} from 'react';
import NavBarBottom from '../components/nav-bar-bottom/nav-bar-bottom';

import ButtonFromNavBarBottom from '../components/nav-bar-bottom/button/button';

import {promiseSingleTimeout, promiseTwoTimeouts} from '../utils/selfwriting-phrases';

import styles from './index.module.scss';

export default function Home() {
  const router = useRouter();
  const dropsWrap = useRef(null);

  const [questionContent, setQuestionContent] = useState([]);
  const [answerContent, setAnswerContent] = useState([]);


  let backgroundDrops = [];
  for (let i = 0; i < 5; i++) {
    backgroundDrops.push(<div className={styles.binaryDropLine} key={backgroundDrops.length}><p>01010000011010010110111001100101011000010111000001110000011011000110010100100000011100000110100101111010011110100110000100100000011010010111001100100000011101000110100001100101001000000110001001100101011100110111010000101110</p></div>)
  }
  useEffect(() => {
    ///////////////////////////////////////////////////////////////
    // RANDOM VERTICAL LINES WITH BINARY CODE IN THE BACKGROUND

    const dropAnimationDuration = 15;
    const binaryNumbersSizeAnimation = 10;

    const allDivFromDropsAnimation = dropsWrap.current.querySelectorAll('div');
    const allPFromDropsAnimation = dropsWrap.current.querySelectorAll('p');

    const dropsLeftPosition = [];
    
    function randomPosition() {
      
      allDivFromDropsAnimation.forEach(div => {
        let newRandomLeftPosition = Math.random() * 100;
        if (dropsLeftPosition.length >= 1 && 
            dropsLeftPosition.find(elem => Math.abs(elem - newRandomLeftPosition) < 3.5)
        ) {
          while (dropsLeftPosition.find(elem => Math.abs(elem - newRandomLeftPosition) < 3.5)) {
            newRandomLeftPosition += 5;
            if (newRandomLeftPosition >= 95) {
              newRandomLeftPosition -= 90
            }
          }
          dropsLeftPosition.push(newRandomLeftPosition);
        } else {
          if (newRandomLeftPosition >= 95) {
            newRandomLeftPosition -= 90;
            while (dropsLeftPosition.find(elem => Math.abs(elem - newRandomLeftPosition) < 3.5)) {
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
          dropsLeftPosition.splice(0)
        }
      });
      allDivFromDropsAnimation.forEach(div => div.style.marginTop = `-${Math.random() * 20}rem`);
    }

    randomPosition();

    allDivFromDropsAnimation.forEach(div => div.style.animationDuration = `${dropAnimationDuration}s`);
    allPFromDropsAnimation.forEach(p => p.style.fontSize = `${binaryNumbersSizeAnimation}px`);

    const randomMarginGeneration = setInterval(() => {
      randomPosition()
    }, 1000 * dropAnimationDuration)

    /////////////////////////////////////
    // SELF-WRITING QUESTION & ANSWER

    const question = 'Do you need a ninja-level web developer for your project?'.split('');

    const answerBeginningUntilComma = 'If so,'.split('');
    const answerBeginningAfterComma = ' have a look at '.split('');
    const myPortfolioSpan = <Link href="/portfolio/projects" key={'my portoflio button'}><a><ButtonFromNavBarBottom additionalStyles={styles.answerButtons} >my portfolio</ButtonFromNavBarBottom></a></Link>
    const answerAnd = ' and '.split('');
    const dropMeALineSpan = <Link href="/contact" key={'drop me a line button'}><a><ButtonFromNavBarBottom additionalStyles={styles.answerButtons} >drop me a line</ButtonFromNavBarBottom></a></Link>
    const answerPeriod = ' .';
    
    const typingSpeed = 35;
    const questionLineTimeout = 3000;
    const waitingAfterComma = 500;
    let writeText = true;

    async function selfWritingText() {
      // QUESTION LINE --> "Do you need a ninja-level web developer for your project?"
      const questionWrittenCharacters = [];
      await promiseTwoTimeouts(question, questionWrittenCharacters, setQuestionContent, typingSpeed, questionLineTimeout, writeText);

      // ANSWER LINE --- SPLIT DUE TO THE NEED OF DIFFERENT TIMEOUTS AND TO INCLUDE BUTTONS
      const answerWrittenBeginningUntilComma = [];
      await promiseTwoTimeouts(answerBeginningUntilComma, answerWrittenBeginningUntilComma, setAnswerContent, typingSpeed, 1000, writeText);

      const answerWrittenBeginningAfterComma = [];
      await promiseTwoTimeouts(answerBeginningAfterComma, answerWrittenBeginningAfterComma, setAnswerContent, typingSpeed, waitingAfterComma, writeText);
      await promiseSingleTimeout(myPortfolioSpan, setAnswerContent, 0, writeText);

      const answerWrittenAnd = []
      await promiseTwoTimeouts(answerAnd, answerWrittenAnd, setAnswerContent, typingSpeed, 1000, writeText);
      await promiseSingleTimeout(dropMeALineSpan, setAnswerContent, 0, writeText);
      await promiseSingleTimeout(answerPeriod, setAnswerContent, 1000, writeText);
    }
    selfWritingText();

    return () => {
      // Stop the "setInterval()" - "binaryNumbersGeneration" function execution as soon the URL changes.
      router.events.off('routeChangeStart', () => {
        clearInterval(randomMarginGeneration);
      });
      writeText = false;
    };
    
  }, [])

  const content = useMemo(() => {
    return (
      <>
      <div className={styles.title}>
        <h1 className={styles.welcome}>Welcome to Joaquín M2’s Website</h1>
        <h2 className={styles.position}>Full-Stack Web Developer</h2>
      </div>
      <div className={styles.questionAnswer}>
        <p className={styles.question}>
          {questionContent}
        </p>
        <p className={styles.answer}>
          {answerContent}
        </p>
      </div>
      </>
    )
  })

  return (
    <>
      <Head>
        <title>JM2 Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={styles.wrap} ref={dropsWrap}>
          {backgroundDrops}
        </div>
        <div className={styles.positionMainElements}>
          <main className={styles.container}>
            {content}
          </main>
          <NavBarBottom />
        </div>
    </>
  )
}
