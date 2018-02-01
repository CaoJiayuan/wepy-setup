const state = {
  num : 1
};


const getters = {
  num: state => state.num
};

const actions = {
  add(state) {
    state.num ++
  }
};


export default {
  state,
  getters,
  actions
}
