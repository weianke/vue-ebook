<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { ebookMixin } from '../../utils/mixin'
import Epub from 'epubjs'
import { Promise } from 'q'
import { getFontFamily, saveFontFamily, saveFontSize, getFontSize, getTheme, saveTheme, getLocation } from '@/utils/localStorage'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }

      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.setDefaultTheme(defaultTheme)
      this.rendition.themes.select(defaultTheme)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      const location = getLocation(this.fileName)
      this.display(location, () => {
        // 设置主题
        this.initTheme()
        // 获取本地存储中的字体大小 刷新也不会丢失
        this.initFontSize()
        // 获取本地存储中的字体 刷新也不会丢失
        this.initFontFamily()
        // 设置全局样式
        this.initGlobalStyle()
      })

      // 通过epub的钩子函数改变iframe中字体
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
          // console.log('字体全部加载完毕...')
        })
      })
    },
    initGesture () {
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
    },
    parseBook () {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        const navItem = (function flatten (arr) {
          return [].concat(...arr.map(v => [v, ...flatten(v.subitems)]))
        })(nav.toc)

        function find (item, v = 0) {
          const parent = navItem.filter(it => it.id === item.parent)[0]
          return !item.parent ? v : (parent ? find(parent, ++v) : v)
        }

        navItem.forEach(item => {
          item.level = find(item)
          item.total = 0
          item.pagelist = []
          if (item.href.match(/^(.*)\.html$/)) {
            item.idhref = item.href.match(/^(.*)\.html$/)[1]
          } else if (item.href.match(/^(.*)\.xhtml$/)) {
            item.idhref = item.href.match(/^(.*)\.xhtml$/)[1]
          }
        })
        this.setNavigation(navItem)
      })
    },
    initEpub () {
      const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      // 钩子函数做分页
      this.book.ready.then(() => {
        // 设置返回分页默认显示文字数
        return this.book.locations.generate(750 * (window.innerWidth / 375 * (getFontSize(this.fileName) / 16)))
      }).then(locations => {
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    }
  },
  mounted () {
    const fileName = this.$route.params.filename.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style scoped lang='scss'>
</style>
