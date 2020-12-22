export default {
  getDisplayName: state => state.displayName,
  getEmail: state => state.email,
  getPhotoURL: state => state.photoURL,
  isAuth: ({ uid }) => uid ? true : false
}
