import firebase from 'firebase/app'


const UserService = {
  /**
   * Creates a new user account associated with the specified email address and password.
   * On successful creation of the user account, this user will also be signed
   *
   * @param {Object} credential - The user's credential
   * @param {string} credential.email - The user's unique email address
   * @param {string} credential.password - The user's chosen password
   * @return {firebase.User} Created user
   */
  signUpWithEmailAndPassword: async ({ email, password }) => {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      throw new RegistrationError(error.message)
    })

    return user
  },

  /**
   * Signs in using an email and password
   *
   * @param {Object} credential - The user's credential
   * @param {string} credential.email - The user's unique email address
   * @param {string} credential.password - The user's chosen password
   * @return {firebase.User} User
   */
    signInWidthEmailAndPassword: async ({ email, password }) => {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        throw new AuthenticationError(error.message)
      })

      return user
    },

  /**
   * Updates a user's profile data
   *
   * @param {Object} profile - The data to update
   * @param {string} profile.displayName - The new display name
   * @param {string} profile.photoURL - The new photo url
   * @return {firebase.User} Updated user profile data
   */
  updateProfile: async ({ displayName, photoURL }) => {
    const user = firebase.auth().currentUser

    if (!user) throw new AuthenticationError('User is not authorized')

    await user.updateProfile({
      ...(displayName && { displayName }),
      ...(photoURL && { photoURL })

    }).catch(error => {
      throw new UpdatingError(error.message)

    })

    return user
  },

  /**
   * Signs out the current user
   */
  signOut: async () => {
    await firebase.auth().signOut()
  }
}


export class AuthenticationError extends Error {
  constructor(message) {
    super(message)

    this.name = this.constructor.name
  }
}

export class RegistrationError extends Error {
  constructor(message) {
    super(message)

    this.name = this.constructor.name
  }
}

export class UpdatingError extends Error {
  constructor(message) {
    super(message)

    this.name = this.constructor.name
  }
}


export default UserService
