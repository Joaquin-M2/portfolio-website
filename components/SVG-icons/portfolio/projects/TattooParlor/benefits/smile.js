import styles from './benefits-icons.module.scss';

export default function SmileIcon(props) {
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
      <title>Clients satisfaction</title>
      <path d="M16 32c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zM16 3c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13zM6 16v2c0 4.4 3.6 8 8 8h4c4.4 0 8-3.6 8-8v-2h-20zM12 23.656c-0.829-0.296-1.591-0.776-2.236-1.42-1.138-1.138-1.764-2.642-1.764-4.236h4v5.656zM18 24h-4v-6h4v6zM22.236 22.236c-0.645 0.645-1.407 1.125-2.236 1.42v-5.656h4c0 1.594-0.627 3.098-1.764 4.236zM7.042 12c0 0 0 0 0 0 0.305 0 0.566-0.22 0.616-0.522 0.192-1.146 1.177-1.978 2.341-1.978s2.149 0.832 2.341 1.978c0.050 0.301 0.311 0.522 0.616 0.522s0.566-0.22 0.616-0.521c0.034-0.201 0.051-0.404 0.051-0.604 0-1.999-1.626-3.625-3.625-3.625s-3.625 1.626-3.625 3.625c0 0.199 0.017 0.402 0.051 0.604 0.051 0.301 0.311 0.521 0.616 0.521zM19.042 12c0 0 0 0 0 0 0.305 0 0.566-0.22 0.616-0.522 0.192-1.146 1.177-1.978 2.341-1.978s2.149 0.832 2.341 1.978c0.050 0.301 0.311 0.522 0.616 0.522s0.566-0.22 0.616-0.521c0.034-0.201 0.051-0.404 0.051-0.604 0-1.999-1.626-3.625-3.625-3.625s-3.625 1.626-3.625 3.625c0 0.199 0.017 0.402 0.051 0.604 0.051 0.301 0.311 0.521 0.617 0.521z"></path>
    </svg>
  );
}