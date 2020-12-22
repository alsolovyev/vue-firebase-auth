<template>
  <main>
    <h1>Sign up</h1>

    <!-- BEGIN Form -->
    <form action="#" @submit.prevent="onSubmit">
      <input type="text" v-model.lazy="form.displayName"/>
      <input type="text" v-model.lazy="form.email"/>
      <input type="text" v-model.lazy="form.password"/>
      <button type="submit">Sign up</button>
    </form>
    <!-- END Form -->

    <!-- BEGIN Errors -->
    <ul v-if="errors.length > 0">
      <li v-for="(error, index) in errors" :key="index">
        <p>{{ error }}</p>
      </li>
    </ul>
    <!-- END Errors -->
  </main>
</template>


<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { CHANGE_APP_STATUS } from '@/store/modules/app/mutations.types'


const DEFAULT_PHOTO_URL = '//sun9-25.userapi.com/CI_mKRXlvIoKRmlTlAk6jeBcIaaLRQNI7dc3Nw/NdKs6OmPhTQ.jpg'

export default {
  name: 'Signup',
  data: () => ({
    form: {
      displayName: 'Jane R.',
      email: 'janerivaz@gmail.com',
      password: 'Solo1991',
      photoURL: DEFAULT_PHOTO_URL
    },
    errors: []
  }),
  comouted: {
    ...mapGetters('app', ['isLoading'])
  },
  methods: {
    /** Dispatch Actions */
    ...mapActions('user', ['signUp']),

    /** Dispatch Mutations */
    ...mapMutations('app', [CHANGE_APP_STATUS]),

    /** Submit event handler */
    onSubmit: function() {
      if (this.isLoading) return
      this[CHANGE_APP_STATUS]('LOADING')

      this.errors = []

      this.signUp(this.form)
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
        .catch(error => {
          this.errors.push(error.message)
        })
        .finally(() => {
          this[CHANGE_APP_STATUS]('COMPLETE')
        })
    }
  }
}
</script>
