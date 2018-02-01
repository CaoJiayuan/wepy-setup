import {createReducer} from '../store';
import user from './modules/user';
import counter from './modules/counter';

const reducer = createReducer({
  user,
  counter,
});


export default reducer
