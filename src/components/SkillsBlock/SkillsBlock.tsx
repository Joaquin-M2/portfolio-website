import styles from "./skillsBlock.module.scss";

interface SkillsBlockProps {
  children: JSX.Element | JSX.Element[];
  additionalStyles?: string;
  color: "red" | "green" | "yellow";
}

export default function SkillsBlock({
  additionalStyles,
  color = "red",
  children,
}: SkillsBlockProps) {
  return (
    <div
      className={`${styles.Container} ${color === "red" && styles.red} ${
        color === "green" && styles.green
      } ${color === "yellow" && styles.yellow} ${additionalStyles}`}
    >
      {children}
    </div>
  );
}
