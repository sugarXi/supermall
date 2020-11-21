<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="center" class="title">
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" >
        </div>
        <div class="titleItem"
         v-for="(item,index) in titles"
          :key="index"
          :class="{active: index ===currentIndex}"
          @click="titleClick(index)"
          >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
export default {
name:"DetailNavBar",
data() {
  return {
   titles:['商品','参数','评论','推荐'] ,
   currentIndex:0
  }
},
components:{
  NavBar
},
methods: {
  titleClick(index){
    
  this.currentIndex=index
  this.$emit('titleClick',index)

  },
  backClick(){
    this.$router.back()
  }
},
}
</script >

<style scoped>
.detail-nav-bar{
background-color: #fff;
}
.title{
 
  display: flex;
  font-size: 14px;
}
.titleItem{
  flex: 1;
}
.active{
  color:var(--color-high-text) ;
}
.back img{
  margin-top: 11px;
}
</style>>

