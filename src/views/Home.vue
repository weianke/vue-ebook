<template>
  <div class="home">
    <!-- <div id="read"></div> -->
    <span class="icon-bookmark"></span>
  </div>
</template>

<script>
import Epub from 'epubjs'
global.ePub = Epub
export default {
  name: 'home',
  mounted () {
    this.book = new Epub('/2018_Book_AgileProcessesInSoftwareEngine.epub')
    this.book.renderTo('read', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>
<style scoped lang='scss'>

</style>
