<template>
  <view>
    <div class="search-box">
      <uni-search-bar @input="getKeyword" />
    </div>
    <div class="suff-list" v-if="searchResult.length != 0">
      <div class="sugg-item" v-for="(item,index) in searchResult" :key="index" @click="goToDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </div>
    </div>
    <div class="history-box" v-else>
      <text>搜索历史</text>
      <uni-icons type="trash" size="17"></uni-icons>
      <div class="histotory-list">
        <uni-tag v-for="(item,index) in histories" :text="item" :key="index"></uni-tag>
      </div>
    </div>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        searchResult: [],
        keyword: '',
        histories: []
      }
    },
    methods: {
      saveSearchHistory() {
        let set = new Set(this.histories)
        set.delete(this.keyword)
        this.histories = Array.from(set)
        this.histories.unshift(this.keyword)
      },
      goToDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      getKeyword(val) {
        console.log('val', val)
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.keyword = val
          this.search()
        }, 500)
      },
      async search() {
        if (this.keyword.trim().length == 0) {
          this.searchResult = [];
          return
        }

        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/goods/qsearch', {
            query: this.keyword
          })
          console.log(res)
          this.searchResult = res.message
          if (this.searchResult.length == 0) {
            console.log(this.searchResult.length)
            uni.$showMsg('未查询到相关信息',3000);
            return;
          }

          this.saveSearchHistory();
        } catch (e) {
          uni.$showMsg();
        }
      }


    },
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .suff-list {
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>
