import styles from "./skillsBlock.module.scss";

interface SkillsBlockProps {
  children: JSX.Element | JSX.Element[];
  additionalStyles?: string;
}

export default function SkillsBlock({
  additionalStyles,
  children,
}: SkillsBlockProps) {
  return (
    <div className={`${styles.Container} ${additionalStyles}`}>{children}</div>
  );
}
