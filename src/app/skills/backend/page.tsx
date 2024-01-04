"use client";

import { useMemo } from "react";

import SkillsBlock from "@/components/SkillsBlock/SkillsBlock";
import SkillBar from "@/components/SkillsBlock/SkillBar/SkillBar";

import styles from "./backendPage.module.scss";

function Page() {
  // It is necessary to use the "useMemo()" hook in order to avoid re-renders on the progress bars
  // whenever the "useState()" hook is updated.
  const skills = useMemo(() => {
    return (
      <>
        <SkillsBlock color="green" additionalStyles={styles.nodeSkillsBlock}>
          <SkillBar
            color="blue"
            title="Node.js"
            progressPercentage={65}
            href="https://nodejs.org/en"
          >
            <SkillBar
              color="blue"
              title="Express"
              progressPercentage={60}
              isSubLevel
              href="https://expressjs.com/"
            />
            <SkillBar
              color="blue"
              title="Mongoose"
              progressPercentage={60}
              isSubLevel
              href="https://mongoosejs.com/"
            />
            <SkillBar
              color="blue"
              title="Sequelize"
              progressPercentage={50}
              isSubLevel
              href="https://sequelize.org/"
            />
          </SkillBar>
        </SkillsBlock>
        <SkillsBlock color="yellow" additionalStyles={styles.pythonSkillsBlock}>
          <SkillBar
            color="blue"
            title="Python"
            progressPercentage={55}
            href="https://www.python.org/"
          >
            <SkillBar
              color="blue"
              title="Django"
              progressPercentage={50}
              isSubLevel
              href="https://www.djangoproject.com/"
            >
              <SkillBar
                color="blue"
                title="Django REST"
                progressPercentage={50}
                isSubLevel
                href="https://www.django-rest-framework.org/"
              />
            </SkillBar>
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
