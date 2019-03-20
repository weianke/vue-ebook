<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  methods: {
    initEpub () {
      const url = 'http://192.168.199.129:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
    }
  },
  mounted() {
    const fileName = this.$route.params.filename.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })
  },
  computed: {
    ...mapGetters([
      'fileName'
    ])
  }
}
</script>

<style scoped lang='scss'>

</style>
