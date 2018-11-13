<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="title"/>
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
      title: state => state.title
    })
  },
  components: {
    HelloWorld
  }
}
</script>
