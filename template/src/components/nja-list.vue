<template>
  <div class="page-loadmore">
       <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
          <!--列表-->
           <slot name="list"></slot>
           <!--下拉-->
           <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
          </div>
          <!--上拉-->
           <div slot="bottom" class="mint-loadmore-bottom">
             <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
             <span v-show="bottomStatus === 'loading'">
               <mt-spinner type="snake"></mt-spinner>
             </span>
           </div>
         </mt-loadmore>
       </div>
  </div>
</template>
<script>
export default {
  name: 'nja-list',
  props: {
    height: Number
  },
  data() {
      return {
        allLoaded: false,
        bottomStatus: '',
        topStatus: '',
        wrapperHeight: 0
      };
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadBottom() {
        this.$emit('on-up-load');
      },
      loaded() {
          this.$refs.loadmore.onBottomLoaded();
          this.$refs.loadmore.onTopLoaded();
      },
      finish(f) {
        this.allLoaded = f;
      },
      loadTop() {
        this.$emit('on-down-load');
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.height;
    }
};
</script>
<style scoped lang="less">
.page-loadmore{
      .page-loadmore-desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        &:last-of-type {
          border-bottom: solid 1px #eee;
        }
      }
      .page-loadmore-wrapper {
        overflow: scroll;
      }
      .mint-spinner {
        display: inline-block;
        vertical-align: middle;
      }
    }
  .mint-loadmore-bottom {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
    }
    .is-rotate {
      transform: rotate(180deg);
    }
  }
  .mint-loadmore-top {
    span {
      display: inline-block;
      transition: .2s linear;
      vertical-align: middle;
    }
    .is-rotate {
      transform: rotate(180deg);
    }
  }
</style>
