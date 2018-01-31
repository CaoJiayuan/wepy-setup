import {createStore} from '../store';
import user from './modules/user';
import counter from './modules/counter';

const reducer = createStore({
  user,
  counter,
});


export default reducer
