import UserService from '@/services/user.service.js'
import { UPDATE_USER_STATE, CLEAR_USER_STATE } from './mutations.types' /* eslint-disable-line */
import router from '@/router'


export default {
  /**
   * Creates a new user account associated with the specified email address and password.
   * On successful creation of the user account, this user will also be signed
   */
  signUp: async ({ commit }, { displayName, email, password, photoURL }) => { /* eslint-disable-line */
    const user = await UserService.signUpWithEmailAndPassword({ email, password })
                 await UserService.updateProfile({ displayName, photoURL })

    commit(UPDATE_USER_STATE, { displayName, email, photoURL })

    return user
  },

  /**
   * Signs in using an email and password
   */
  signIn: async ({ commit }, { email, password }) => { /* eslint-disable-line */
    const user = await UserService.signInWidthEmailAndPassword({ email, password })

    /**
     * This mutation is processed in 'firebase.auth().onAuthStateChanged'
     *  - file: @/services/firebase.service.js
     */
    // commit(UPDATE_USER_STATE, user)

    return user
  },

  /**
   * Signs out the current user
   */
  signOut: async ({ commit }) => { /* eslint-disable-line */
    await UserService.signOut()

    /**
     * This mutation is processed in 'firebase.auth().onAuthStateChanged'
     *  - file: @/services/firebase.service.js
     */
    // commit(CLEAR_USER_STATE)

    router.currentRoute.fullPath !== '/' && router.push('/')
  },

  /**
   * Updates a user's profile data
   *
   * @param {Object} data - The profile's data to update.
   */
  updateProfile: async ({ commit }, data) => {
    const user = await UserService.updateProfile(data)

    commit(UPDATE_USER_STATE, data)

    return user
  }
}
