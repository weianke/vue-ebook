<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    hideTitleAndMenu () {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
    },
    initEpub () {
      const url = 'http://192.168.199.129:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      this.rendition.on('touchstart', event => {
        // 獲取一隻手指點擊屏幕的x軸位置
        this.touchStartX = event.changedTouches[0].clientX
        // 獲取手指點擊時間來判斷是否是手指長按屏幕事件
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        // 離開屏幕時獲得x軸的偏移量
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        // 我們消耗的時間
        const time = event.timeStamp - this.touchStartTime
        // 劃過時間需要小於500毫秒，偏移量大於40時我們進入上一頁
        if (time < 500 && offsetX > 40) {
          // 往左滑动 返回上一页 根据clientX的差值
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          // 往右滑动 往下一页
          this.nextPage()
        } else {
          // 如果没有滑动就显示中间内容 
          this.toggleTitleAndMenu()
        }
        // 禁止默认事件传播
        event.preventDefault()
        event.stopPropagation()
      })
    }
  },
  mounted () {
    const fileName = this.$route.params.filename.split('|').join('/')
    console.log(this.$route.params.filename)
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style scoped lang='scss'>
</style>
