let init = {
  foo: 1
}
const reducer = function (state = init, action) {

  if (action.type === 'FOO') {
    state.foo++
  }

  console.log(state, action)
  return state;
}


export default reducer
