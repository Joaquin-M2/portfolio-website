"use client";

import { useMemo } from "react";

import SkillsBlock from "@/components/SkillsBlock/SkillsBlock";
import SkillBar from "@/components/SkillsBlock/SkillBar/SkillBar";

import styles from "./frontendPage.module.scss";

function Page() {
  // It is necessary to use the "useMemo()" hook in order to avoid re-renders on the progress bars
  // whenever the "useState()" hook is updated.
  const skills = useMemo(() => {
    return (
      <>
        <SkillsBlock additionalStyles={styles.HTMLSkillsBlock}>
          <SkillBar
            title="HTML"
            progressPercentage={90}
            href="https://developer.mozilla.org/en-US/docs/Web/HTML"
          >
            <SkillBar
              title="Accessibility"
              progressPercentage={55}
              isSubLevel
              href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility"
            />
            <SkillBar
              title="SEO"
              progressPercentage={50}
              isSubLevel
              href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide"
            />
          </SkillBar>
        </SkillsBlock>
        <SkillsBlock additionalStyles={styles.CSSSkillsBlock}>
          <SkillBar
            color="blue"
            title="CSS"
            progressPercentage={90}
            href="https://developer.mozilla.org/en-US/docs/Web/CSS"
          >
            <SkillBar
              color="blue"
              title="SASS"
              progressPercentage={80}
              isSubLevel
              href="https://sass-lang.com/"
            />
            <SkillBar
              color="blue"
              title="Tailwind"
              progressPercentage={60}
              isSubLevel
              href="https://tailwindcss.com/"
            />
            <SkillBar
              color="blue"
              title="Bootstrap"
              progressPercentage={50}
              isSubLevel
              href="https://getbootstrap.com/"
            />
            <SkillBar
              color="blue"
              title="UX & UI"
              progressPercentage={50}
              isSubLevel
              href="https://web.dev/articles/ux-basics"
            >
              <SkillBar
                color="blue"
                title="Figma"
                progressPercentage={50}
                isSubLevel
                href="https://www.figma.com/"
              />
            </SkillBar>
          </SkillBar>
        </SkillsBlock>
        <SkillsBlock additionalStyles={styles.JavaScriptSkillsBlock}>
          <SkillBar
            color="orange"
            title="JavaScript"
            progressPercentage={85}
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          >
            <SkillBar
              color="orange"
              title="TypeScript"
              progressPercentage={70}
              isSubLevel
              href="https://www.typescriptlang.org/"
            />
            <SkillBar
              color="orange"
              title="React"
              progressPercentage={80}
              isSubLevel
              isSubLevelWithChild
              href="https://react.dev/"
            >
              <SkillBar
                color="orange"
                title="Redux"
                progressPercentage={65}
                isSubLevel
                href="https://redux.js.org/"
              />
              <SkillBar
                color="orange"
                title="MUI"
                progressPercentage={70}
                isSubLevel
                href="https://mui.com/"
              />
              <SkillBar
                color="orange"
                title="RHF"
                progressPercentage={75}
                isSubLevel
                href="https://react-hook-form.com/"
              />
              <SkillBar
                color="orange"
                title="Next.js"
                progressPercentage={80}
                isSubLevel
                href="https://nextjs.org/"
              />
            </SkillBar>
            <SkillBar
              color="orange"
              title="Vue.js"
              progressPercentage={70}
              isSubLevel
              href="https://vuejs.org/"
            />
            <SkillBar
              color="orange"
              title="Storybook"
              progressPercentage={80}
              isSubLevel
              href="https://storybook.js.org/"
            />
            <SkillBar
              color="orange"
              title="Jest"
              progressPercentage={70}
              isSubLevel
              isSubLevelWithChild
              href="https://jestjs.io/"
            >
              <SkillBar
                color="orange"
                title="RTL"
                progressPercentage={80}
                isSubLevel
                href="https://testing-library.com/docs/react-testing-library/intro/"
              />
            </SkillBar>
            <SkillBar
              color="orange"
              title="Cypress"
              progressPercentage={65}
              isSubLevel
              href="https://www.cypress.io/"
            />
            <SkillBar
              color="orange"
              title="Postman"
              progressPercentage={70}
              isSubLevel
              href="https://www.postman.com/"
            />
          </SkillBar>
        </SkillsBlock>
      </>
    );
  }, []);

  return (
    <>
      <div className={styles.positionMainElements}>
        <main className={styles.MainContainer}>{skills}</main>
      </div>
    </>
  );
}
export default Page;
