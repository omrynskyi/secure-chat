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
    login() {//checking if user inputed a name
      if (this.name) {
        //if yes enter chat with the name as a peramenter
        //if want good login change this part to check if password matches name
        this.$router.push({name:'UserList', params: { name: this.name, userList: ["Fredrick","Joe","Yuri","Ligma","Tylor"]}});
       //this.$router.push({name: 'Chat', params: {name: this.name}})
      } else {
        //if not error message appears
        this.errorText = "Please enter a name!"
      }
    },
    socialLogin(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result)=> {
      let nameOfUser = result.additionalUserInfo.profile.name;
        if(!result.additionalUserInfo.isNewUser){
          console.log(result);
  
          fb.collection("users").doc(nameOfUser).set({
            name: result.additionalUserInfo.profile.name

          });
        }
        
        this.$router.push({name:'UserList' , params: { name: nameOfUser, userList: ["Fredrick","Joe","Yuri","Ligma","Tylor"]}});
      }).catch((err) =>{
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