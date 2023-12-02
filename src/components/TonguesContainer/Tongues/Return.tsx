"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ReturnLogo from "@/components/SVG-icons/return";

import styles from "./tongues.module.scss";

const ReturnTongue: React.FC = () => {
  const pathname = usePathname();
  return (
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

export default ReturnTongue;
