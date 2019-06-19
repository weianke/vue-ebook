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
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list"
            :top="156"
            :bottom="48"
            ref="scroll">
      <div class="slide-contents-item"
           v-for="(item, index) in navigation"
           :style="contentItemStyle(item)"
           :key="index">
        <span class="slide-contents-item-label"
              :class="{'selected': section === index}">{{item.label.trim()}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
  </div>
</template>

<script  type='text/ecmascript-6'>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'

export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data () {
    return {
      searchVisible: false
    }
  },
  methods: {
    contentItemStyle (item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
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
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      box-sizing: border-box;
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
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
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        font-size: px2rem(12);
        line-height: px2rem(14);
        padding: 0 px2rem(10);
        box-sizing: border-box;
        margin-top: px2rem(5);
        @include ellipsis2(2);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(74);
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
  .slide-contents-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: px2rem(20) 0;
      box-sizing: border-box;
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
      }
      .slide-contents-item-page {
        flex: 0 0 px2rem(30);
        font-size: px2rem(10);
        @include right;
      }
    }
  }
}
</style>
