<template>
  <div class="tab-bar-item" @click="itemClick" >
    <div v-if="!isActive"><slot name="item-icon" ></slot></div>
    <div v-else><slot name="item-icon-active" ></slot></div>
    <!-- <div :class="{active:isActive}"> -->
    <div :style="activeStyle">
    <slot name="item-text" ></slot>
    </div>
    
     <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
    </div>
</template>

<script>
export default {
name:'TabBarItem',
props:{
path:String,
activeColor:{
  type:String, 
  default:'red'
}
},
data() {
  return {
    // isActive:false
  }
},
computed: {
  isActive(){
    //判断当前路由是否含有动态组件名 不等于负一
    return this.$route.path.indexOf(this.path) !== -1
  },
  activeStyle(){
    //处于活跃改变字体颜色
    return this.isActive ? {color:this.activeColor} : {}
  }
},
methods: {
  itemClick(){
  //  console.log('itemClick');
 this.$router.push(this.path).catch(err => err)
//  this.$router.push(this.path)
  
  }
},
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /* line-height: 49px; */
  font-size:14px ;

}
.tab-bar-item>div>img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
/* 除去图片下3个空白像素 */
  vertical-align: middle;
  margin-bottom: 2px;

}
/* .active{
color:brown
} */
</style>