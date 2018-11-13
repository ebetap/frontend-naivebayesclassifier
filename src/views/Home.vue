<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="title"/>
    <h4>{{subtitle}}</h4>
    <h5>Author : {{author}}</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState} from 'vuex'
export default {
  name: 'home',
  computed:{
    ...mapState({
      title: state => state.title,
      subtitle: state => state.subtitle,
      author: state => state.author
    })
  },
  components: {
    HelloWorld
  }
}
</script>
