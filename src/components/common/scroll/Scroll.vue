<template>
<div class="wrapper" ref='wrapper'>
  <div class="content">
   <slot></slot>
  </div>
</div>
  
</template>

<script>
import BScroll, { PullUpLoad } from 'better-scroll'
export default {
name:'Scroll',
props:{
  probeType:{
    type:Number,
    default:0
  },
  pullUpLoad:{
     type:Boolean,
     default:true
  }
},
data() {
  return {
    bs:null,
    msg:'sss'
  }
},
mounted() {
  //1创建bscroll
  this.bs=new BScroll(
   this.$refs.wrapper,{
     click:true,
     //实时监听滚动
     probeType:this.probeType,
     //上拉事件
     pullUpLoad:this.pullUpLoad
   })
  //2 监听滚动位置
    this.bs.on('scroll',(position)=>{
    //滚动条位置
    // console.log(position);
    this.$emit('scroll',position)
  })
  

  //监听上拉事件 滚动到底部
  if(this.pullUpLoad){
    
   this.bs.on('pullingUp',()=>{
    //  console.log('上拉加载更多');
   this.$emit('pullingUp')
  })
  }
  
},
methods: {
  //滚回顶部
  scrollTo(x,y,time=300){
  this.bs && this.bs.scrollTo &&  this.bs.scrollTo(x,y,time)
  },
  //完成加载更多
  finishPullUp(){
   this.bs && this.bs.finishPullUp()
  },
  //图片加载调用更新
  refresh(){
     //console.log('kkk');
  this.bs && this.bs.refresh()
  },
  //离开前滚动的y坐标
  getScrollY(){
  console.log(this.bs);
   return this.bs ? this.bs.y :0
  }
},
}
</script>

<style>

</style>