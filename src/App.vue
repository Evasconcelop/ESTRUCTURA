<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
};
</script>

<style>
html,body {
  height: 99%;
  background-color:rgb(255, 114, 6);
  background-repeat: no-repeat;
  background-size: cover; /* La imagen de fondo se ajustará para cubrir completamente el área del fondo */
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
