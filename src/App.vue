<script>
import HeaderApp from './components/HeaderApp.vue';
import FooterApp from './components/FooterApp.vue';


export default{

  components:{

    HeaderApp,
    FooterApp,
   

  }
}
</script>

<template>
  <div class="main">
    <HeaderApp></HeaderApp>
    <router-view></router-view>
    <FooterApp></FooterApp>
  </div>
</template>

<style>
.main {
  user-select: none;
}
</style>
