import { UPDATE_USER_STATE, CLEAR_USER_STATE } from './mutations.types'


export default {
  /**
   * Fill in user information
   *
   * @param {Object} payload - user information
   */
  [UPDATE_USER_STATE]: (state, payload) => {
    Object.keys(payload).forEach(key => {
      Object.prototype.hasOwnProperty.call(state, key) && (state[key] = payload[key])
      // key in state && (state[key] = payload[key])
    })
  },

  /**
   * Clear user information
   */
  [CLEAR_USER_STATE]: (state) => {
    Object.keys(state).forEach(key => {
      state[key] = null
    })
  }
}
