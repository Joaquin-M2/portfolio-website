import styles from './benefits-icons.module.scss';

export default function HealthIcon(props) {
  return (
    <svg
      className={`${styles.icon} ${props.additionalStyle}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="32"
      y="32"
      viewBox="0 0 32 32"
    >
      {props.colorGradient}
      <title>Health goes first</title>
      <path d="M28 8h-6v-4c0-1.1-0.9-2-2-2h-8c-1.1 0-2 0.9-2 2v4h-6c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-16c0-2.2-1.8-4-4-4zM12 4h8v4h-8v-4zM24 22h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4z"></path>
    </svg>
  );
}