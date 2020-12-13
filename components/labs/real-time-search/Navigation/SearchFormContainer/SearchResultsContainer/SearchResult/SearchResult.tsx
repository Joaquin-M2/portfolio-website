import styles from './SearchResult.module.scss';

import Picture from './Picture/Picture';
import Title from './Title/Title';
import FlapText from './FlapText/FlapText';
import Author from './Author/Author';
import Links from './Links/Links';

interface SearchResultProps {
  img: string;
  title: string;
  flap: string;
  author: string;
}

const SearchResult: React.FC<SearchResultProps> = props => {
  return (
    <div className={styles.container}>
      <Picture img={props.img} />
      <Title>{props.title}</Title>
      <FlapText>{props.flap}</FlapText>
      <Author>{props.author}</Author>
      <Links
        linkToGoogle={`https://www.google.com/search?q=${props.title.replace(
          / /g,
          '+'
        )}+${props.author.replace(/ /g, '+')}`}
        linkToAmazon={`https://www.amazon.com/s?k=${props.title.replace(
          / /g,
          '+'
        )}+${props.author.replace(/ /g, '+')}`}
      />
    </div>
  );
};

export default SearchResult;
