import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default (Vuex) => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  });
}
