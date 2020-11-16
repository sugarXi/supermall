<template>

  <div class="cart-list" >
   <scroll class="content" ref="scroll">
    <!-- <ul>
     <li v-for="(i ,k) in cartList" :key="k">{{i}}</li>
   </ul> -->
   <cart-list-item v-for="(item ,index) in cartList" 
   :key="index" :item-info='item'
   ></cart-list-item>
   </scroll>
   
 </div>
 
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'

export default {
name:'CartList',
computed: {
  ...mapGetters(['cartList'])
},
components:{
  Scroll,
  CartListItem
},
activated() {
this.$refs.scroll.refresh()
},
}
</script>

<style scoped>
.cart-list{
  height:calc(100% - 134px);

   position: relative;
   
}
.content{
   position: absolute ;
  top: 0px;
  bottom:0px;
  left: 0;
  right: 0;
 overflow: hidden;
}
</style>