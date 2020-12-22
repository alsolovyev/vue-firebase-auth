<template>
  <main>
    <h1>Sign in</h1>

    <!-- BEGIN Form -->
    <form action="#" @submit.prevent="onSubmit">
      <input type="text" v-model.lazy="form.email"/>
      <input type="text" v-model.lazy="form.password"/>
      <button type="submit">Sign in</button>
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


export default {
  name: 'Signin',
  data: () => ({
    form: {
      email: 'janerivaz@gmail.com',
      password: 'Solo1991'
    },
    errors: []
  }),
  comouted: {
    ...mapGetters('app', ['isLoading'])
  },
  methods: {
    /** Dispatch Actions */
    ...mapActions('user', ['signIn']),

    /** Dispatch Mutations */
    ...mapMutations('app', [CHANGE_APP_STATUS]),

    /** Submit event handler */
    onSubmit: function() {
      if (this.isLoading) return
      this[CHANGE_APP_STATUS]('LOADING')

      this.errors = []

      this.signIn(this.form)
        .then(() => {
          this.$router.push(this.$route.query.redirect || { name: 'Home' })
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
