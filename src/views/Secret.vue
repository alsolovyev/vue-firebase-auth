<template>
  <main>
    <h1>Secret</h1>

    <!-- BEGIN Form -->
    <form action="#" @submit.prevent="onSubmit">
      <input type="text" v-model.lazy="form.displayName" placeholder="Username" />
      <input type="text" v-model.lazy="form.photoURL" placeholder="Photo url" />
      <button type="submit">Update profile</button>
      <button @click.prevent="signOut">Log out</button>
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
  name: 'Secret',
  data: () => ({
    form: {
      displayName: null,
      photoURL: null
    },
    errors: []
  }),
  computed: {
    ...mapGetters('user', {
      photoURL: 'getPhotoURL',
      displayName: 'getDisplayName',
    }),
    ...mapGetters('app', ['isLoading'])
  },
  methods: {
    /** Dispatch Actions */
    ...mapActions('user', ['signOut', 'updateProfile']),

    /** Dispatch Mutations */
    ...mapMutations('app', [CHANGE_APP_STATUS]),

    /** Submit event handler */
    onSubmit: function() {
      if (this.isLoading) return
      this[CHANGE_APP_STATUS]('LOADING')

      this.errors = []

      this['updateProfile'](this.form)
        .then(() => {

        })
        .catch(error => {
          this.errors.push(error.message)
        })
        .finally(() => {
          this[CHANGE_APP_STATUS]('COMPLETE')
        })
    }
  },
  created() {
    this.form.displayName = this.displayName
  }
}
</script>


