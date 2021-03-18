<template>
<div>
  <v-container
    ><v-row justify="center" style="margin-top: 15%">
      <v-col cols="12" sm="6" style="margin-top: 5%">
        <h3>ยินดีต้อนรับสู่</h3>
        <h1 style="color: #03a9f4; margin-top:0.5rem; margin-bottom:0.5rem">SKYCAR</h1>
        <h4>เว็บไซต์เช่ารถยนต์รายวันที่ดีที่สุดในเชียงใหม่</h4>
      </v-col>
      <v-col cols="12" sm="4">
        <h4 style="margin-bottom:0.7rem;">ให้เราพาคุณไปสู่ที่ที่คุณต้องการ</h4>
        <v-divider style="margin-bottom:0.7rem;" class="dvd" />
        <v-subtitle>ชื่อหรืออีเมลผู้ใช้</v-subtitle>
        <v-text-field
          v-model="email"
          label="E-mail"
          solo
          dense
          rounded
          :rules="emailRules"
          style="margin-top: 0.5rem"
        ></v-text-field>
        <v-list-item-subtitle>รหัสผ่าน</v-list-item-subtitle>
        <v-text-field
          v-model="password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          :rules="[rules.required, rules.min]"
          label="Password"
          solo
          dense
          rounded
          style="margin-top: 0.5rem"
        ></v-text-field>
        <div class="text-center dvd">
          <v-btn rounded color="light-blue" style="margin-bottom: 0.5rem" dark  @click="login()"> เข้าสู่ระบบ </v-btn>
        </div>
        <div class="text-center dvd">
          <v-btn rounded color="red darken-2" style="margin-bottom: 0.5rem" dark  @click="loginGoogle()"> Sign in with Google </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</div>
        
</template>

<script>
import firebase from 'firebase/app'
import { auth } from '~/plugins/firebaseConfig.js'
export default {
  data() {
    return {
      show2: false,
      email: '',
      password: '',
      clock: {
        el: '#clock',
        data: {
          time: '',
          date: '',
        },
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show1: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  methods: {
    checkUser() {
      var user = auth.currentUser
      console.log(user === null)
    },

    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential
          // The signed-in user info.
          const user = result.user
          console.log('token x : ' + token)
          alert('login successful!')
          this.$router.replace('/Profile')
        })

        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
          console.log('ErrorCode' + errorCode)
          alert('Email or Password uncorrect!')
          console.log('ErrorCode' + errorMessage)
          // ...
        })
    },

    loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider()

      auth

        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          const credential = result.credential

          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = credential.accessToken
          console.log('token=' + token)
          // The signed-in user info.
          const user = result.user
          console.log('user=' + user)
          // ...
          this.$router.replace('/Profile')
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          console.log('errorCode' + errorCode)
          const errorMessage = error.message
          console.log('errorMassege' + errorMessage)
          // The email of the user's account used.
          const email = error.email
          console.log('erroremail' + email)

          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential
          console.log('errorCode' + credential)
          // ...
        })
    },
  },
}
</script>
