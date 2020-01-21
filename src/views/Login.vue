<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        
        <button @click="socialLogin" class="socialButton">
            <img alt="Google Logo" src ="../assets/google.png" class="logo">
          </button>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import fb from '@/firebase/init';
//import moment from 'moment'; 
export default {
  name: 'home',
  data () {
    return {
      name: "Me",
      errorText: null,
      users: []
    }
  },
  methods: {
    socialLogin(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          
          let user = {
            id: result.user.uid,
            name: result.additionalUserInfo.profile.name,
            picture: result.additionalUserInfo.profile.picture,
            email: result.additionalUserInfo.profile.email  
          };

          let userRef = fb.collection('users');
          userRef.doc(user.id).get()
            .then((doc) => {
              if (!doc.exists) {
                userRef.doc(user.id).set(user);
              }
            });

          this.$router.push({name:'UserList' , params: { name: user.name }});
        })
        .catch((err) =>{
          alert("Oops. " + err.message)
        });
    }
  }
}
</script>
<style>
.login{
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.logo{
  width:10%;
  height:auto;
}

</style>