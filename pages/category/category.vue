<template> 
 <view  >
   <my-search @click="toSearch"></my-search>
   <view class="category">
     <scroll-view scroll-y="true" class="left-scroll" :style="{height:wh + 'px'}">
      <block v-for="(item,index) in cateList">
        <div :class="['left-scroll-view-item',active == index ? 'active' : '']"  @click="activeChanged(index)">
          {{ item.cat_name }}
        </div>
      </block>
     </scroll-view>
     <scroll-view scroll-y="true" class="right-scroll" :style="{height:wh + 'px'}" :scrollTop='scrollTop'>
      <div class="right-scroll-view-item" v-for="(item2,index) in cateLever2">
        <div class="cate-lever2-title">
          {{ item2.cat_name }}
        </div>
       <div class="cate-lever3">
         <div  class="cate-lever3-item" v-for="(item3,index) in item2.children " @click="gooGoodsList(item3)">
           <image :src="item3.cat_icon" mode=""></image>
           <text> {{ item3.cat_name}}</text>
         </div>
       </div>
      </div>
     </scroll-view>
   </view>
 </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollTop:0,
        wh: 0,
        cateList:[],
        cateLever2:[],
        active:0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList();
    },
    methods:{
      toSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      },
      gooGoodsList(item3){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item3.cat_id
        })
      },
      activeChanged(index){
        this.active = index;
        this.cateLever2 = this.cateList[index].children
        this.scrollTop = this.scrollTop == 0 ?  1 :0 
      },
      async getCateList(){
         try {
           const {
             data: res
           } = await uni.$http.get('/api/public/v1/categories')
           this.cateList = res.message
           this.cateLever2 = this.cateList[0].children
         } catch (e) {
           uni.$showMsg();
         }
      }
    }
  }
</script>

<style lang="scss">
  .category {
    display: flex;
  
  .left-scroll {
      width: 120px;
     .left-scroll-view-item {
       line-height: 60px;
       background-color: #f7f7f7;
       text-align: center;
       font-size: 12px;
       &.active {
         background-color: #fff;
         position: relative;
         &::before {
           content:  '' ;
           background-color: red;
           display: block;
           width: 1px;
           height: 30px;
           position: absolute;
           top: 50%;
           left: 0;
           transform: translateY(-50%);
         }
       }
     }  
    }
    .right-scroll-view-item {
      .cate-lever3 {
        display: flex;
        flex-wrap: wrap;
        .cate-lever3-item {
          width: 33.3%;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          image {
            width: 60px;
            height: 60px;
          }
          text {
            font-size: 12px
          }
        }
      }
    }
  }
</style>
