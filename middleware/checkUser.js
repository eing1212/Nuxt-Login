import firebase from 'firebase/app'

export default function ({
  redirect,
  route
}) {
  var user = firebase.auth().currentUser;
  if (!route.path.includes('index')) { // ใช่มั้ย if path doesn't include "dashboard", stop there 
    if (user) {
      // User is signed in.
      console.log(user.email)
    } else {
      // No user is signed in.
      console.log("Not Login")
      // this.$router.replace('/admin')
      redirect('index') //9ตอนนี้ใส่redirecแต่redirecยังไม่ทำงานไม่ได้
    }
  }
} //redirect