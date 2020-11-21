<template>
<div class="tab-menu" >
   <scroll class="content" ref="scroll">
    <div class="menu-list">
    <div class="menu-list-item"
  :class="{active: index===currentIndex}"
    v-for="(item,index) in categories " 
    :key="index"
    @click="itemClick(index)">
    {{item.title}}
    </div>
  </div>
</scroll>
  </div> 
</template>

<script>
 import Scroll from 'components/common/scroll/Scroll'
export default {
name:'TabMenu',
components:{
  Scroll
},
data() {
  return {
    currentIndex:0
  }
},
props:{
  categories: Array
},
methods:{
itemClick(index){
  this.currentIndex=index
  this.$emit('selectItem',index)
}
},
activated() {
this.$refs.scroll.refresh()
},

}
</script>

<style scoped>
.tab-menu{
  background-color: #f6f6f6;
   height: 100%;
  width: 100px;
  box-sizing: border-box;
  position: relative;
}
.content{
  position: absolute;
   top: 0px;
  bottom:0px;
  left: 0;
  right: 0;
 overflow: hidden;
}
.menu-list-item {
height: 45px;
line-height: 45px;
text-align: center;
font-size: 14px;
  border-left: 3px solid #f6f6f6;

}
 .active {
 font-weight: 700;
 color: var(--color-high-text);
 background-color:#fff;
  border-color: var(--color-high-text);

}
</style>