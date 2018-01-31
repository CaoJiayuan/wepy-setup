const state = {
  num : 1
};


const getters = {
  num: state => state.num
};

const actions = {
  add(state, e) {
    this.num ++
  }
};


export default {
  state,
  getters,
  actions
}
