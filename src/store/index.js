import { getStore } from 'wepy-redux'

let stores = {};
let states = undefined;
let getters = undefined;
let actions = undefined;

/***
 *
 * @param {Object} modules
 * @returns {Function}
 */
function createReducer(modules) {
  stores = modules;
  let initState = getStates();
  getActions();

  return function (state = initState, action) {
    let type = action.type;
    let payload = action.payload;
    let act = objectGet(actions, type);
    if (typeof act === 'function') {
      let partials = type.split('.');
      let s = state;
      if (partials.length > 1) {
        s = state[partials[0]];
      }
      if (payload.length > 1) {
        act.apply(s, [s, ...payload])
      } else {
        act.apply(s, [s, payload])
      }
    }

    return state;
  }
}

function getModules() {
  return stores;
}

function getStates() {
  if (states !== undefined) {
    return states;
  }

  states = {};
  for (let module in stores) {
    states[module] = stores[module].state
  }

  return states;
}

function getGetters() {
  if (getters !== undefined) {
    return getters;
  }

  getters = {};
  for (let module in stores) {
    getters[module] = stores[module].getters
  }

  return getters;
}


function getActions() {
  if (actions !== undefined) {
    return actions;
  }

  actions = {};
  for (let module in stores) {
    actions[module] = stores[module].actions
  }

  return actions;
}

function mapStates(find) {
  let g = getGetters();

  for (let key in find) {
    let get = find[key];
    let fn = objectGet(g, get);
    find[key] = function (state) {
      let partials = get.split('.');

      let s = state;
      if (partials.length > 1) {
        let namespace = partials[0]
        s = state[namespace];
      }
      return fn(s)
    }
  }

  return find;
}

function mapActions (find) {
  let store = getStore();

  for (let key in find) {
    let get = find[key];
    find[key] = function (...args) {

      return store.dispatch({
        type : get,
        payload : args
      })
    }
  }

  return find;
}

function mapGetters(find) {
  let g = getGetters();
  let store = getStore();
  let state = store.getState()

  for (let key in find) {
    let get = find[key];
    let fn = objectGet(g, get);
    find[key] = function () {
      let partials = get.split('.');
      let s = state;
      if (partials.length > 1) {
        let namespace = partials[0]
        s = state[namespace];
      }

      return fn(s)
    }
  }

  return find;
}

function objectGet(object, key, $default) {
  let clone = simpleClone(object);
  if (object.hasOwnProperty(key)) {
    return object[key];
  }

  let partials = key.split('.');
  let length = partials.length;
  for (let i = 0; i < length; i++) {
    clone = clone[partials[i]];
    if (clone === undefined) {
      return $default
    }
  }

  return clone;
}

function simpleClone(state) {
  let copy = (this instanceof Array) ? [] : {};
  for (let attr in state) {
    if (!state.hasOwnProperty(attr)) continue;
    copy[attr] = state[attr];
  }
  return copy;
};


module.exports = {
  createReducer,
  mapGetters,
  mapActions,
  mapStates,
  getModules
};
