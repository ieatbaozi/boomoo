// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import firebase from 'firebase'
Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(
  user=>{
    if(app)return;
    app = new Vue({
        el: '#app',
        template: '<App/>',
        router,
        components: { App }
    })
  })


require('./css/style.css')
require('./css/bootstrap.min.css')
require('./js/bootstrap.min.js')

