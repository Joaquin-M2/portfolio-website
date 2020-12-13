import styles from './Author.module.scss';

interface AuthorProps {
  children: string;
}

const Author: React.FC<AuthorProps> = props => {
  return (
    <address className={styles.author}>
      Author:{' '}
      <a
        href={`https://www.google.com/search?q=${props.children.replace(
          / /g,
          '+'
        )}`}
        rel="author noopener noreferrer nofollow"
        target="_blank"
      >
        {props.children}
      </a>
    </address>
  );
};

export default Author;
