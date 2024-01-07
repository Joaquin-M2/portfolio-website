import styles from "./alert.module.scss";

interface AlertProps {
  backendResponse: { message: string; status: number };
}

function Alert({ backendResponse }: AlertProps) {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.baseStyling} ${
          backendResponse.message &&
          backendResponse.status >= 400 &&
          styles.error
        } ${
          backendResponse.message &&
          backendResponse.status < 400 &&
          styles.success
        }`}
        aria-label={backendResponse.message}
        role="alert"
      >
        {backendResponse.message}
      </p>
    </div>
  );
}

export default Alert;
