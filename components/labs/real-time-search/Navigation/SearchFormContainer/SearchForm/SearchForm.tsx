// import { connect } from 'react-redux';
// import * as actionCreators from '../../../../store/actions/index';

import styles from './SearchForm.module.scss';

import { useStore } from '../../../../../../hooks-store/store';

// const StyledSearchForm = styled.form`

//     display: ${props => (props.userInput < 1 ? 'none' : 'block')};
// `;

// interface SearchFormInputProps {
//   userInput: string;
// }

const SearchFormInput: React.FC = props => {
  let userStoppedWritting;
  /**
   * const [state, dispatch] = useStore();
   */
  const state = useStore()[0];
  const dispatch: any = useStore()[1];

  return (
    <form
      className={`${styles.form} ${
        state.userInput === '' ? null : styles.displayForm
      }`}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="Real Time Search lab. Write here a term and it will show you books!"
        onKeyUp={e => {
          e.persist();
          // TypeScript needs to know the type of the HTMLElement which is the event target.
          const eventTarget = e.target as HTMLInputElement;

          clearTimeout(userStoppedWritting);
          console.log(eventTarget.value);
          if (eventTarget.value) {
            userStoppedWritting = setTimeout(() => {
              dispatch('USER_INPUT', eventTarget.value.trim());
            }, 500);
          } else if (eventTarget.value === '') {
            dispatch('USER_INPUT', eventTarget.value.trim());
          }
        }}
      />
    </form>
  );
};

export default SearchFormInput;
