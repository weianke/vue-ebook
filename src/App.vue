<template>
  <div id="app">
    <span class="text" v-text="$t('m.music')"></span>
    <div class="top_btn"
         @click="changeLangEvent">中文</div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  mounted () {
    // this.$store.dispatch('setTest', 32).then(() => {
    //    console.log(this.book)
    // })
    this.setTest('23424')
  },
  methods: {
    ...mapActions([
      'setTest'
    ]),
    changeLangEvent () {
      if (this.$i18n.locale === 'zh-CN') {
        this.$i18n.locale = 'en-US'//关键语句
        console.log('en-US')
      } else {
        this.$i18n.locale = 'zh-CN'//关键语句
        console.log('zh-CN')
      }
  }
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
@import '@/assets/styles/mixin.scss';
.text {
  font-size: px2rem(20);
  color: orange;
}
</style>
