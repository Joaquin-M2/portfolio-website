import '../sass/main.scss';

import configureUserInputStore from '../hooks-store/labs/real-time-search/user-input-store';

/**
 * Conditionals won't work in order to load global states in specific paths.
 * They load "too late" (when the component is already rendered). Maybe an issue of SSR?
 */
// if (typeof window !== 'undefined') {
//   if (window.location.pathname === '/portfolio/labs/real-time-search') {
//     configureUserInputStore();
//   }
// }

/**
 * Lab "real-time-search"  global state.
 */
configureUserInputStore();

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
