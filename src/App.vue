<template>
  <div id="app">
    <span class="text">ADOAMO</span>
    <router-view/>
  </div>
</template>

<script>
  export default {}
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style>
.text {
  font-size: 1rem;
  color: orange;
  font-family: 'Days One';
}
</style>
