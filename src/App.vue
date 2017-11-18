<template>
  <div id="app">
    
    <div class="container">
      <div class="header clearfix">
        <nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Bookmarker </a>
    </div>
    <ul class="nav navbar-nav">
      <li><router-link to="/main" ><a>Bookmarks</a></router-link></li>
      <li><router-link to='/profile'><a>Profile</a></router-link></li>
      <li><router-link to='/about'><a>About</a></router-link></li>
      <li><a href='#' v-on:click='onLogoutOrSignup'>{{logoutOrSignup}}</a></li>
    </ul>
  </div>
</nav>
      </div>
        <router-view/>
        <footer class="footer">
        <p>&copy; 2016 Bookmarker, Inc.</p>
      </footer> 
    </div>  
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "app",
  components: {},
  data(){
    return{
      logoutOrSignup:'signup'
    }
  },
  methods:{ 
    onLogoutOrSignup(){
      if(firebase.auth().currentUser){
        firebase.auth().signOut().then(()=>this.$router.push({name:"login"}))
      }else{
        this.$router.push({name:'signup'})
      }
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(()=>{
      if(firebase.auth().currentUser){
        this.logoutOrSignup='Logout'
      }else{
        this.logoutOrSignup='Signup'
      }
    })
  }
};
</script>


