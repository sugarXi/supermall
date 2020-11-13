<template>
<div class="goods">
  <good-list-item v-for="(item,goodlist1) in goods" :key="goodlist1" :goods-item='item'/>
 
</div>
  
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
name:'GoodList',
components:{
GoodListItem
},
props:{
  goods:{
    type:Array,
      default(){
        return[]
      }
  }
  
}
}
</script>

<style>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}

</style>