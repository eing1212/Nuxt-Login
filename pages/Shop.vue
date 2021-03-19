<!--<template>
  <v-row>
    <v-col class="text-center">
      <img :src="photoUrl" alt="Vuetify.js" class="mb-5" />
      <h1>- Welcome -</h1>
      <h3> {{ name }} </h3>
      <h5> {{ email }} </h5>
      <span />
      <v-btn color="error" class="mr-4" @click="Edit"> Edit </v-btn>
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
</script> -->

<template>
  <div>
    <v-row justify="center">
      <v-col cols="10">
          <h2>Welcome - {{ email }} - </h2>
      </v-col>
      <v-col cols="2">
        <img :src="photoUrl">
        <div>
        <v-btn color="error" class="mr-4" @click="logout"> logout </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card rounded="lg" min-height="50" color="indigo accent-3">
          <h1 class="text-center">รายการรถยนต์</h1>
        </v-card> </v-col
      ><v-col v-for="(i, index) in list" :key="index" cols="3"
        ><v-card rounded="lg" 
        color="grey lighten-1" 
        nuxt>
          <v-toolbar color="indigo darken-4" dark dense flat>
            <v-toolbar-title class="body-2"> {{ i.name }} </v-toolbar-title>
          </v-toolbar>
          <v-img
            class="white--text align-end"
            height="200px"
            :src="i.imgUrl"
            align="center"
          >
          </v-img>
          <v-card-subtitle class="pb-0 text-right">
            {{ i.carID }}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              <v-icon class="ic"> mdi-bitcoin </v-icon> ราคาเช่า
              {{ i.price }} บาท
            </div>

            <div>
              <v-icon class="ic"> mdi-car-seat </v-icon> {{ i.detail1 }}
            </div>
            <div>
              <v-icon class="ic"> mdi-treasure-chest </v-icon> {{ i.detail2 }}
            </div>
            <div><v-icon class="ic">mdi-car</v-icon> {{ i.status }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              nuxt
              color="yellow darken-2"
              rounded
              block
              dark
            >
              จองรถ
            </v-btn>
          </v-card-actions>
        </v-card></v-col
      ></v-row
    >
  </div>
</template>

<script>
import { db } from '~/plugins/firebaseConfig.js'
import firebase from 'firebase/app'
export default {
  data() {
    return { 
      list: [],
      email: '',
      photoUrl: '',
       }
  },

  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.email = user.email
        this.photoUrl = user.photoURL
      } else {
        this.$router.replace('/')
      }
    })
  },

  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      db.collection('cardata')
        .orderBy('carID', 'asc')
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.list = data
          console.log(this.list)
        })
    },

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
  },
}
</script>

<style>
.ic {
  margin-right: 0.4rem;
}
</style>