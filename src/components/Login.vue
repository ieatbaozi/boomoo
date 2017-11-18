<template>
  <div class="login">
      <h3>Login</h3>
      <input type="text" v-model="user.username" placeholder="Username"><br>
      <input type="password" v-model="user.password" placeholder="Password"><br>
      <button @click="login">Login</button>
      <p>Don't have an account? Please <router-link to="/signup"> signup?</router-link></p>
      <hr>

  </div>
</template>
<script>
import firebase from 'firebase'
var md5 = require('md5')
import {db} from '@/firebaseConfig'
export default {
    name: 'login',
    data(){
        return{
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        login(){
            firebase.auth().signInWithEmailAndPassword(this.user.username, this.user.password).then(
                user=>{
                    alert('Welcome to Bookmarker online!!!')
                    this.$router.push({name:'main'})
                }
            )
        },   
    },
    mounted(){
        /*this.user.username='a@a.com'
        this.user.password='12341234'
        this.login()*/
    }
}
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }
    input {
        margin: 10px 0;
        width: 40%;
        padding: 15px;
    }
    button {
        margin-top: 20px;
        width: 10%;
        cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 11px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }

</style>