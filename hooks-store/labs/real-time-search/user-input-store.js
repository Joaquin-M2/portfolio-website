import { initStore } from '../../store';

const configureUserInputStore = () => {
  const actions = {
    USER_INPUT: (globalState, newState) => ({ userInput: newState }),
  };

  initStore(actions, { userInput: '' });
};

export default configureUserInputStore;
