<template>
  <div class="home d-flex">
    <MainMenu/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainMenu from '@/components/MainMenu.vue'
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
    MainMenu
  }
}
</script>
