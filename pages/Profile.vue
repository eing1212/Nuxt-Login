<template>
  <v-row>
    <v-col class="text-center">
      <img :src="photoUrl" alt="Vuetify.js" class="mb-5" />
      <h1>- Welcome -</h1>
      <h3> {{ name }} </h3>
      <h5> {{ email }} </h5>
      <v-btn color="error" class="mr-4" @click="logout"> logout </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      name: '',
      email: '',
      photoUrl: '',
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.name = user.displayName
        this.email = user.email
        this.photoUrl = user.photoURL
      } else {
        this.$router.replace('/')
      }
    })
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          alert('Sign-out successful')
          console.log('Sign-out successful')
          this.$router.replace('/Profile')
        })
        .catch((error) => {
          // An error happened.
          console.log(error)
        })
    },
  }
}
</script>