<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script  type='text/ecmascript-6'>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  }
}
</script>

<style scoped lang='scss'>

</style>
