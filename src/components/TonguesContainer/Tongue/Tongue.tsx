"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import GithubLogo from "@/components/SVG-icons/github";
import ReturnLogo from "@/components/SVG-icons/return";

import styles from "./tongue.module.scss";

interface TongueProps {
  isGithubLink?: boolean;
  githubPath?: string;
}

const Tongue = ({ githubPath, isGithubLink }: TongueProps) => {
  const pathname = usePathname();
  return isGithubLink ? (
    <a className={styles.link} href={githubPath} target="_blank">
      <div className={`${styles.container} ${styles.github}`}>
        <div className={styles.icon}>
          <GithubLogo />
        </div>
        <div className={styles.text}>Check the code</div>
      </div>
    </a>
  ) : (
    <Link
      className={styles.link}
      href={
        pathname.startsWith("/portfolio/projects/")
          ? "/portfolio/projects"
          : "/portfolio/labs"
      }
    >
      <div className={`${styles.container} ${styles.return}`}>
        <div className={styles.icon}>
          <ReturnLogo />
        </div>
        <div className={styles.text}>Return</div>
      </div>
    </Link>
  );
};

export default Tongue;
