<template>
  <div class="profile">
    <h2>User Information</h2>   
    <br>
    <p v-if="user.name">Name: {{ user.name }}</p>
    <p>Birthdate: {{user.birthDate}}</p>
    <p>Email: {{ user.email }}</p>
    <p>Facebook: {{ user.facebookUrl }}</p>
  </div>
</template>
<script>
import firebase from 'firebase'
import {db} from '@/firebaseConfig'
var md5=require('md5')
export default{
    name:'profile',
    data(){
        return{
            uid:'',
            user:{ email:'',facebookUrl:'',name:'',birthDate:''}
            }
    },
    methods:{
        fetchData(){
             db.ref("users/" + this.uid).on('value', snapshot=>{
                 if(snapshot){
                     this.user=snapshot.val()
                 }
             })
        }
    },
    created(){
        if(!firebase.auth().currentUser) {
            alert('Login first alright?')
            this.$router.push({'name':'login'})
        }
        else {
            this.uid=md5(firebase.auth().currentUser.email)
            this.fetchData()
        }
    }
}
</script>