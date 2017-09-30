<template>
  <div class="page-loadmore" v-title data-title="查询">
    <nja-list @on-up-load="loadup" @on-down-load="loaddown" :height=50 ref="njaList">
      <ul class="page-loadmore-list" slot="list">
        <li v-for="item in list" class="page-loadmore-listitem">\{{ item }}</li>
      </ul>
    </nja-list>
  </div>
</template>
<script>
import NjaList from '@/components/nja-list';
export default {
  name: 'nja-query',
  components: {
    NjaList
  },
  data() {
      return {
        list: [],
        page: 1,
        limit: 20
      };
    },
    methods: {
      loadup() {
        setTimeout(() => {
          if (this.page < 4) {
            this.page++;
            this.load();
          } else {
            // this.allLoaded = true;
              this.$refs.njaList.finish(true);
          }
          //
          this.$refs.njaList.loaded();
        }, 1500);
      },
      loaddown() {
        setTimeout(() => {
          this.page = 1;
          this.list = [];
          this.load();
          this.$refs.njaList.finish(false);
          this.$refs.njaList.loaded();
        }, 1500);
      },
      load () {
        let data = [];
        for (let i = 1; i <= this.limit; i++) {
          data.push((this.page - 1) * this.limit + i);
        }
        this.list = this.list.concat(data);
      }
    },
    created() {
      this.load();
    }
};
</script>
<style scoped lang="less">
.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #eee;
  text-align: center;
  &:first-child {
    border-top: solid 1px #eee;
  }
}
</style>
