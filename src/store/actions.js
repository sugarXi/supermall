import{
  ADD_COUNTER,ADD_TO_CART
}from './mutationsTypes'

export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
//payLoad新添加商品
   //  let oldProduct =null
   //  for (const item  of state.cartList) {
   //    if(item.iid === payload.iid){
   //      oldProduct = item 
   //    }
   //  }
   //1 查找 之前数组 是否有该商品
   let oldProduct = context.state.cartList.find(
    item => item.iid === payload.iid
  )
   //2 判断oldProduct 
   if(oldProduct){
     //数量加一
     context.commit(ADD_COUNTER,oldProduct)
    resolve('商品数量加一')
   }else{
     //添加一个新商品
     payload.count =1
     context.commit(ADD_TO_CART,payload)
     resolve('添加到购物车')
     // state.cartList.push(payload)
   }
    })
    

     
   }
}