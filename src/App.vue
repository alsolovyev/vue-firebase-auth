<template>
  <div :class="{ 'is-loading': isLoading }">
    <!-- BEGIN Header -->
    <header>
      <h3>{{ displayName ? displayName : email }}
        <span :style="{ color: isAuth ? '#C3E88d' : '#FF5370' }" >{{ isAuth }}</span>
      </h3>

      <nav>
        <ul class="nav">
          <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
          <li><router-link :to="{ name: 'Secret' }">Secret</router-link></li>
          <li v-if="!isAuth"><router-link :to="{ name: 'Signin' }">Sign in</router-link></li>
          <li v-if="!isAuth"><router-link :to="{ name: 'Signup' }">Sign up</router-link></li>
          <li v-if="isAuth"><a href="#" @click.prevent="signOut">Sign out</a></li>
          <li>
            <a
              href="//console.firebase.google.com/project/vue-auth-38cd8/authentication/users"
              target="_blank">Firebase</a>
          </li>
        </ul>
      </nav>
    </header>
    <!-- BEGIN Header -->


    <!-- BEGIN Main content -->
    <router-view/>
    <!-- END Main content -->
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'App',
  // data: () => ({
  //   links: [
  //     { _id: 0, name: 'Home',   label: 'Home' },
  //     { _id: 1, name: 'Signin', label: 'Sign in' },
  //     { _id: 2, name: 'Signup', label: 'Sign up' },
  //     { _id: 3, name: 'Secret', label: 'Secret' }
  //   ]
  // }),
  computed: {
    ...mapGetters('user', {
      photoURL: 'getPhotoURL',
      email: 'getEmail',
      displayName: 'getDisplayName',
      isAuth: 'isAuth'
    }),
    ...mapGetters('app', {
      isLoading: 'isLoading'
    }),
  },
  methods: {
    ...mapActions('user', ['signOut'])
  }
}
</script>


<style lang="sass">
@import '@/sass/common'
</style>
