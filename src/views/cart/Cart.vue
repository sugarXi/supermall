<template>
<div class="cart">
  <!-- 导航 -->
<nav-bar class="navBar">
  <div slot="center">购物车({{length}})</div>
</nav-bar>
<!-- 列表 -->
<cart-list ></cart-list>
<!-- 底部汇总 -->
<cart-bottom-bar></cart-bottom-bar>
</div>
 
</template>

<script>
import  NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
  
  name:'Cart',
  
components:{
  NavBar,
  CartList,
  CartBottomBar
  
},
computed: {
  //数组语法
  //  ...mapGetters([
  //    'cartLength','cartList'
  //  ]),
   //对象语法
   ...mapGetters({
    length:'cartLength',
   
   })
  },
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.navBar{
  background-color: var(--color-tint);

  color: #fff;
}

</style>