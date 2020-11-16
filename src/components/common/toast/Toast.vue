<template>
<div class="toasts" v-show="isShow">
  <div >{{msg}}</div>
</div>
  
</template>

<script>
export default {
name:'Toast',
props:{
  // msg:{
  // type:String,
  // default:''
  // },
  // isShow :{
  // type:Boolean,
  // default:false
  // }
  
},
data() {
  return {
    msg:'',
    isShow:false
  }
},
methods: {
  show(msg='默认文字',duration=2000){
   this.isShow =true;
   this.msg=msg

   setTimeout(() => {
     this.isShow =false;
   this.msg=''
   }, duration);
  }
},

}
</script>

<style scoped>
.toasts{
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
padding: 15px;
background-color: rgba(0, 0, 0, .7);
z-index: 999;
color: #fff;

}

</style>