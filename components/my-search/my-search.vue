<template>
 <view class="my-search-container" 
  :style="{ 'background-color': bgcolor}">
   <div class="my-search-box" @click="$emit('click')" 
     :style="{ 'border-radius': radius + 'px'}">
       <uni-icons type="search" size="17"></uni-icons>
       <text class="placeholder">搜索 </text>
    </div>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props:{
      bgcolor: {
        type: String,
        default:'#C00000'
      },
      radius: {
        type: Number,
        default:15
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
 .my-search-box {
   height: 36px;
   background-color: #fff;
   width: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   .placeholder {
     font-size: 15px;
     margin-left: 5px;
   }
 } 
}
</style>