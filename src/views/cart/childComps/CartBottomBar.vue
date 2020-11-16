<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked='allCheck' 
       class="all-check"
       @click.native="allCheckClick"
       ></check-button>
      <span>全选</span>
    </div>
    <div  class="totalPrice">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calculateClick">
      去计算({{checkLength}})
    </div>
   
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
name:'CartBottomBar',
components:{
  CheckButton,
},
computed: {
  ...mapGetters(['cartList']),
  totalPrice(){
    return '￥'+ this.cartList.filter(
      item=>{
        return item.checked
      }
    ).reduce(
      (preValue,item)=>{
      return preValue+ item.price * item.count
      },0).toFixed(2)
  },
  checkLength(){
     return this.cartList.filter(item => item.checked).length
   
  },
  //全选
  allCheck(){
  
 if (this.cartList.length ==0)
   return false
 //filter函数使用
 // return  !(this.cartList.filter(item => !item.checked).length)
 //find性能高一些
  return ! this.cartList.find(item =>!item.checked)
//普通遍历
//  for (const i of this.cartList) {
//    if (! i.checked) {
//      return false
//    }
//      return true
//  }
},
},
methods: {
  allCheckClick(){
    if(this.allCheck){
      //全部选中
      this.cartList.forEach(item => item.checked=false)
    }else{
      //部分或者全部不选中
      this.cartList.forEach(item => item.checked=true)
    }
    
  } ,
  calculateClick(){
     if(!this.allCheck){
    this.$toast.show('请选择购买的商品',2000)}
  }
},

}
</script>

<style>
.bottom-bar{
  position: relative;
   display: flex;
  
  height: 40px;
   line-height: 40px;
  background-color: #eee;
  
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.all-check{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
  /* background-color: red; */
}
.totalPrice{
  margin-left: 25px;
  flex: 1;
}
.calculate{
  background-color: orangered ;
  color: #FFF;
  width: 90px;
  text-align:center;
}

</style>