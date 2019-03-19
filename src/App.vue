<template>
  <div id="app">
    <span class="text">ADOAMO</span>
    <router-view/>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    mounted() {
      // this.$store.dispatch('setTest', 32).then(() => {
      //    console.log(this.book)
      // })
      this.setTest('23424')
    },
    methods: {
      ...mapActions([
        'setTest'
      ])
    },
    computed: {
      ...mapGetters([
        'book'
      ])
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.text {
  font-size: px2rem(20);
  color: orange;
}
</style>
