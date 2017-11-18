<template>
  <div class="signup">
      <p>Let's create a new account!</p>
        <input type="text" ref="name" v-model="user.name" placeholder="Full Name"><br>
        <input type="text" ref="email" v-model="user.email" placeholder="Email"><br>
        <input type="password" v-model="user.password1" placeholder="Password"><br>
        <input type="password" ref="password2" v-model="user.password2" placeholder="Confirm password"><br>
        <input type="date" ref="birthDate" pattern="\d{1,2}/\d{1,2}/\d{4}"  required="required" value='1995-11-11'><br>
        <input type="text" ref="facebook" v-model="user.facebookUrl" placeholder="FB url"><br>

        <button  @click="validateBeforeSubmit">Sign Up</button>
      <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebaseConfig'
var md5 = require('md5');
export default {
    name : 'signup',
    data(){
        return{
              user: {
                name: '',
                email: '',
                password1: '',
                password2: '',
                birthDate: '',
                facebookUrl: '',
              }
        }
    },
    methods:{
        validateBeforeSubmit(){
            let fbre = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/
            let fbok = fbre.test(this.user.facebookUrl)
            if (this.user.email && (this.user.password1 === this.user.password2) && fbok) {
                this.Submit()
                } else {
                    if(!this.user.name) {
                        alert('Name cannot be empty');
                        this.$refs.name.focus();
                        return;
                    }
                    if(!this.user.email) {
                        alert('Email cannot be empty');
                        this.$refs.email.focus();
                        return;
                    }
                    if(this.user.password1 != this.user.password2) {
                        alert('Password mismatch');
                        this.$refs.password2.focus();
                        return;
                    }
                    if(!fbok){
                        alert('Invalid Facebook link')
                        this.$refs.facebookUrl.focus()
                    }
                }
     
        },
        Submit(){
            firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password1).then(
                user=>{
                    let uid = md5(this.user.email)
                    this.user.birthDate = this.$refs.birthDate.value.toString()
                    db.ref('users/'+ uid).set(this.user);
                    alert("Wellcome to Bookmarker online!!!");
                    this.$router.push({name: 'main'})
                },
                error=>{
                    alert('Oh dear. ' + error.message)
                }
            )
        }
    }
}
</script>
<style scoped>
    .signUp {
        margin-top: 40px;
    }
    input {
        margin: 5px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 10%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }

</style>
