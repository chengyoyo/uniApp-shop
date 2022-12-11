<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <div class="view-item"  v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </div>
    </view>
    <!-- 楼层区域 -->
    <div class="floor-list">
      <!-- 楼层 -->
      <div class="floor-item"  v-for="(item,index) in floorList" :key="index" @click="floorClickHandler">
        <!-- 楼层标题图片 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片 -->
        <div class="floor-img-box">
          <!-- 左侧大图片 -->
          <div class="left-img-box" >
            <image :data-item="item.product_list[0]" :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix" >
            </image>
          </div>
          <!-- 右侧盒子 -->
          <div class="right-img-box">
            <div class="right-img-item" v-for="(item2,index2) in  item.product_list" :key="index" v-if=" index2 !== 0" >
              <image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width + 'rpx'}"
              :data-item="item2">
              </image >
            </div>
          </div>
        </div>
      </div>
    </div>



  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      floorClickHandler(item){
        console.log("item",item) 
        let navigator_url  =  item.target.dataset.item.navigator_url
       console.log(navigator_url.slice(navigator_url.indexOf("=")))
       navigator_url = navigator_url.slice(navigator_url.indexOf("="))
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query'+navigator_url
        })
      },
      async getFloorList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/home/floordata')
          this.floorList = res.message
        } catch (e) {
          uni.$showMsg();
        }
      },
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/category/category'
          })
        }
      },
      async getSwiperList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/home/swiperdata')
          this.swiperList = res.message
        } catch (e) {
          uni.$showMsg();
        }

      },
      async getNavList() {
        try {
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/home/catitems')
          this.navList = res.message
        } catch (e) {
          uni.$showMsg()
        }
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 68px;
      height: 70px;
    }
  }

  .floor-list {
    .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .right-img-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
</style>
