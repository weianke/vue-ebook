<template>
  <transition name="slide-up">
    <div class="setting-wrapper"
         v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div class="preview"
             ref="left">
          <span :style="{fontSize: fontSizeList[0].fontSize + 'px'}"
                ref="leftText">A</span>
        </div>
        <div class="select">
          <div class="select-wrapper"
               v-for="(item, index) in fontSizeList"
               :key="index"
               @click="setFontSize(item.fontSize)"
               ref="item">
            <div class="line"></div>
            <div class="point-wrapper">
              <div class="point"
                   v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview"
             ref="right">
          <span :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
                ref="rightText">A</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script  type='text/ecmascript-6'>
import { ebookMixin } from '@/utils/mixin'
import { FONT_SIZE_LIST } from '@/utils/book'

export default {
  mixins: [ebookMixin],
  data () {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    setFontSize (fontSize) {
      this.setDefaultFontSize(fontSize)
      this.currentBook.rendition.themes.fontSize(fontSize)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../assets/styles/global';

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-font-size {
    background: #fff;
    flex: 2;
    display: flex;
    height: 100%;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .select {
      display: flex;
      flex: 1;
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          .point {
            position: absolute;
            top: px2rem(-8);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
    }
    .setting-font-family-icon-wrapper {
      @include center;
    }
  }
}
</style>
