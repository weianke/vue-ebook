<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item"
           v-for="(item, index) in data"
           :key="index">
        <div class="ebook-loading-line-wrapper"
             v-for="(subItem, subindex) in item"
             :key="subindex">
          <div class="ebook-loading-line"
               ref="line"></div>
          <div class="ebook-loading-mask"
               ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { px2rem } from '../../utils/utils'
export default {
  data () {
    return {
      data: [
        [{}, {}, {}],
        [{}, {}, {}]
      ],
      maskWidth: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      lineWidth: [
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 }
      ],
      add: true,
      end: false
    }
  },
  mounted () {
    this.task = setInterval(() => {
      this.$refs.mask.forEach((item, index) => {
        const mask = this.$refs.mask[index]
        const line = this.$refs.line[index]
        let maskWidth = this.maskWidth[index]
        let lineWidth = this.lineWidth[index]
        if (index === 0) {
          if (this.add && maskWidth.value < 16) {
            maskWidth.value++
            lineWidth.value--
          } else if (!this.add && lineWidth.value < 16) {
            maskWidth.value--
            lineWidth.value++
          }
        } else {
          if (this.add && maskWidth.value < 16) {
            let preMaskWidth = this.maskWidth[index - 1]
            if (preMaskWidth.value >= 8) {
              maskWidth.value++
              lineWidth.value--
            }
          } else if (!this.add && lineWidth.value < 16) {
            let preLineWidth = this.lineWidth[index - 1]
            if (preLineWidth.value >= 8) {
              maskWidth.value--
              lineWidth.value++
            }
          }
        }
        mask.style.width = `${px2rem(maskWidth.value)}rem`
        mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`
        line.style.width = `${px2rem(lineWidth.value)}rem`
        line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`
        if (index === this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value === 16) {
              this.end = true
            }
          } else {
            if (maskWidth.value === 0) {
              this.end = true
            }
          }
        }
        if (this.end) {
          this.add = !this.add
          this.end = false
        }
      })
    }, 20)
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/styles/global.scss";
.ebook-loading {
  position: relative;
  z-index: 500;
  width: px2rem(63);
  height: px2rem(40);
  background: transparent;
  border: px2rem(1.5) solid #d7d7d7;
  border-radius: px2rem(3);
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: px2rem(7) 0;
      box-sizing: border-box;
      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 px2rem(7);
        box-sizing: border-box;
        @include left;
        .ebook-loading-mask {
          flex: 0 0 0;
          width: 0;
          height: px2rem(1.5);
        }
        .ebook-loading-line {
          flex: 0 0 px2rem(16);
          width: px2rem(16);
          height: px2rem(2);
          background: #d7d7d7;
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: px2rem(1.5);
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>
