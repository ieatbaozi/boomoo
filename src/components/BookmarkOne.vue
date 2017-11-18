<template>
    <div id='bookmark-one'>
      <div class='well'>
      <h3>{{name}}
      <a class="btn btn-default" target="_blank" :href='url'>Visit</a>
      <a class="btn btn-danger" v-on:click='deleteBookmark'>Delete</a> 
      </h3>
      </div>
    </div>
</template>

<script>
export default{
    name:'bookmark-one',
    props:['name','url','jsonkey'],
    methods:{
        deleteBookmark(){
            this.$emit('destroy',this.jsonkey)
        }
    }
}
</script>