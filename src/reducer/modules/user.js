const state = {
  user : {
    id : 123
  }
};


const getters = {
  user: state => state.user
};


const actions = {
  load(state, user) {
    state.user = user;
  }
};


export default {
  state,
  getters,
  actions
}
