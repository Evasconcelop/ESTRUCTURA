<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style>
html,body {
  height: 99%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(6, 6, 6, 0.2)), url('https://oaxaca.anahuac.mx/hs-fs/hubfs/PP%20-%20Anahuac%20-%20Oaxaca/portada2.png?width=1170&name=portada2.png');
  background-repeat: no-repeat;
  background-size: cover; /* La imagen de fondo se ajustará para cubrir completamente el área del fondo */
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
