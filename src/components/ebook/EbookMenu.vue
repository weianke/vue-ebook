<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper"
          :class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
           v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu"
                @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress"
                @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright"
                @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A"
                @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
  </div>
</template>

<script  type='text/ecmascript-6'>
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopup
  },
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../assets/styles/global.scss';

.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(22);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-A {
      font-size: px2rem(20);
    }
  }
}
</style>
