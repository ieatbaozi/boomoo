<template>
  <div id="app">
    
    <div class="container">
  
     
      <div class="jumbotron">
        <h2>Bookmark Your Favorite Sites</h2>
        <form id="myForm" v-on:submit.prevent>
          <div class="form-group">
            <label>Site Name</label>
            <input v-model="siteName" type="text" class="form-control" id="siteName" placeholder="Website Name">
          </div>
          <div class="form-group">
            <label>Site URL</label>
            <input v-model="siteUrl" type="text" class="form-control" id="siteUrl" placeholder="Website URL">
          </div>
          <button v-on:click="onSubmit" class="btn btn-primary">Submit</button>
        </form>
      </div>

      <div class="row marketing">
        <div class="col-lg-12">
          <div id="bookmarksResults">
            <BookmarkOne v-on:destroy='deleteBookmark'
              v-for="bm in bookmarks"
              :key="bm" :name='bm.name' :url='bm.url' :jsonkey='bm.key'>
            </BookmarkOne>
            
          </div>
        </div>
      </div>

   
    </div>  
  </div>
</template>

<script>
import BookmarkOne from "@/components/BookmarkOne";
import firebase from "firebase";
import { db } from "@/firebaseConfig";
var md5 = require("md5");

export default {
  name: "app",
  components: {
    BookmarkOne
  },
  data() {
    return {
      siteName: "",
      siteUrl: "",
      bookmarks: [],
      uid: "",
      user: ""
    };
  },
  methods: {
    validate() {
      if (!this.siteName || !this.siteUrl) {
        alert("Please fill in the form");
        return false;
      }
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      if (!this.siteUrl.match(regex)) {
        alert("Please use a valid URL");
        return false;
      }
      return true;
    },
    onSubmit() {
      if (!this.validate()) return;
      db
        .ref("users/" + this.uid + "/bookmarks")
        .push({ name: this.siteName, url: this.siteUrl },()=>{
            this.fetchBookmarks;
            this.siteName=""
            this.siteUrl=""
          }
        );
    },
    fetchBookmarks() {
      let bms = {}
      db.ref("users/" + this.uid + "/bookmarks").on('value' ,snapshot=>{
        if(snapshot){
          bms = snapshot.val()
          this.bookmarks=[]
          for(let key in bms){
            this.bookmarks.push({
              key:key,
              name:bms[key].name,
              url:bms[key].url
            })
          }
        }
      })
      
    },
    deleteBookmark(jsonkey) {
       //console.log(jsonkey)
       db.ref("users/" + this.uid + "/bookmarks/").child(jsonkey).remove(()=>this.fetchBookmarks)
    }
  },
  created() {
    let f = ()=>{
          let email = firebase.auth().currentUser.email;
          this.uid = md5(email);
          this.user = db
            .ref("users/" + this.uid)
            .once("value")
            .then(snapshot => {
              if (snapshot) {
                this.user = JSON.parse(JSON.stringify(snapshot.val()))
                this.fetchBookmarks();
              }
            });
    };
    if(firebase.auth().currentUser) f()  
    else {
      alert('Login first alright?')
      this.$router.push({'name':'login'})
    }
  }
};
</script>


