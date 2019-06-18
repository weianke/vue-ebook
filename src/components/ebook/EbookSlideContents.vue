<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input"
               type="text"
               :placeholder="$t('book.searchHint')"
               @click="showSearchPage">
      </div>
      <div class="slide-contents-search-cancel"
           v-if="searchVisible"
           @click="hideSearchPage">{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img class="slide-contents-book-img"
             :src="cover">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title"></div>
        <div class="slide-contents-book-author"></div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <div class="progress-text">{{$t('book.haveRead2')}}</div>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { ebookMixin } from '../../utils/mixin'

export default {
  mixins: [ebookMixin],
  data () {
    return {
      searchVisible: false
    }
  },
  methods: {
    showSearchPage () {
      this.searchVisible = true
    },
    hideSearchPage () {
      this.searchVisible = false
    }
  }
}
</script>

<style scoped lang='scss'>
@import "../../assets/styles/global";
.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        @include center;
        .icon-search {
          font-size: px2rem(12);
        }
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-info-wrapper {
    flex: 1;
    @include columnLeft;
    .slide-contents-book-title {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: 0 px2rem(10);
      box-sizing: border-box;
      @include left;
      .slide-contents-book-title-text {
        @include ellipsis2(1);
      }
    }
    .slide-contents-book-author {
      font-size: px2rem(12);
      line-height: px2rem(14);
      padding: 0 px2rem(10);
      box-sizing: border-box;
      margin-top: px2rem(5);
      @include left;
      .slide-contents-book-author-text {
        @include ellipsis2(1);
      }
    }
  }
  .slide-contents-book-progress-wrapper {
    flex: 0 0 px2rem(70);
    @include columnLeft;
    .slide-contents-book-progress {
      .progress {
        font-size: px2rem(14);
        line-height: px2rem(16);
      }
      .progress-text {
        font-size: px2rem(12);
        line-height: px2rem(14);
        margin-left: px2rem(2);
      }
    }
    .slide-contents-book-time {
      font-size: px2rem(12);
      line-height: px2rem(14);
      margin-top: px2rem(5);
    }
  }
}
</style>
