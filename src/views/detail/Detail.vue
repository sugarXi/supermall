<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref='navBar'/>
    <scroll class="content" ref="scroll" 
    :probe-type='3' @scroll='contentScroll'  
    :pull-up-load='true'>
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref='params' :param-info='paramInfo'></detail-param-info>
      <detail-comment-info  ref='comment' :comment-info='commentInfo'></detail-comment-info>
      <good-list ref='recommend' :goods='recommends'></good-list>
    </scroll>
    
    
    <detail-bottom-bar @addCart='addToCart' ></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- <toast :msg='msg' :isShow='isShow'></toast> -->
  </div>
    
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper';
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import  DetailShopInfo from './childComponents/DetailShopInfo'
import  DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'

import {getDetil,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin ,backTopMixin} from 'common/mixin'
import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'
  
  import {mapActions} from 'vuex'
  // import Toast from 'components/common/toast/Toast'

export default {
name:"Detail",
data() {
  return {
    iid:null,
    topImages:[],
    goods: {},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themeTopYs:[],
    currentIndex:0,
    // msg:'',
    // isShow:false

  }
},
mixins:[itemListenerMixin,backTopMixin],
components:{
  Scroll,
DetailNavBar,
DetailSwiper,
DetailBaseInfo,
DetailShopInfo,
DetailGoodsInfo,
DetailParamInfo,
DetailCommentInfo,
DetailBottomBar,



GoodList
,
// Toast
// GoodListItem


},
created() {
  //1 保存传入的id
  this.iid=this.$route.params.iid
 
  //2 根据iid请求详情数据
  getDetil(this.iid).then(res=>{
   
    //1获取顶部轮播图数据
    const data = res.result
    this.topImages=data .itemInfo.topImages
    // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
   //3  创建店铺信息
   this.shop= new Shop(data.shopInfo)
   //4 保存商品的详情数据
   this.detailInfo=data.detailInfo
   //5 获取参数信息
    this.paramInfo=new GoodsParam(data.itemParams.info, data.itemParams.rule)
   //6 取出评论信息
   if(data.rate.cRate!==0){
     this.commentInfo=data.rate.list[0]
   }
  //  //下一帧 dom 渲染完
  //  this.$nextTick(
  //    //根据最新的数据 dom渲染完
  //    //但是图片依然没有加载完   offsetTop值不对都是因为图片后加载
  //    ()=>{
  //    this.themeTopYs=[]
  //  //获取各个主体的offsetTop
  // this.themeTopYs.push(0)
  // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  // console.log( this.themeTopYs);
  //    }
  //  )
  
  })
   

//3 请求推荐数据
getRecommend().then(res =>{
  this.recommends=res.data.list
 
})

   
},
mounted() {
  //1监听详情图片加载
  this.imageLoad()
  
 
},
updated() {
  
},
destroyed() {
  this.$bus.$off('itemImgLoad',this.itemImgListener)
},


methods: {
  ...mapActions(['addCart']),
  imageLoad(){
    this.$refs.scroll.refresh();
    //下一帧 dom 渲染完
   this.$nextTick(
     //根据最新的数据 dom渲染完
     //但是图片依然没有加载完   offsetTop值不对都是因为图片后加载
     ()=>{
     this.themeTopYs=[]
      //获取各个主体的offsetTop
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log( this.themeTopYs);
        }
      ) 
  },
  //监听导航点击滚动到对应内容
  titleClick(index){
  this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
  },

  //监听滚动事件
  contentScroll(position){
     //1 判断backtop是否显示
    this.isShowBackTop=(-position.y)>1000
     //1 获取y值
     const positionY = -position.y
     // 2 positionY与主体值进行对比
      let length =this.themeTopYs.length
     
     for (let i = 0; i <length-1; i++) {
       //普通做法
      //  if( this.currentIndex !== i &&((i < length-1 && positionY >= this.themeTopYs[i] && positionY <this.themeTopYs[i+1]) 
      //  || (i == length-1 && positionY >=this.themeTopYs[i])) ) {
      //    this.currentIndex = i
      //    this.$refs.navBar.currentIndex=this.currentIndex
      //  }
      //hack 做法 数组末尾传入最大值
      if(this.currentIndex !== i && 
        (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
         this.currentIndex = i
         this.$refs.navBar.currentIndex=this.currentIndex
      }
     }
  } ,
  //加入购物车
  addToCart(){
    //1 获取购物车需要展示的信息
    const product={}
    product.image=this.topImages[0];
    product.title=this.goods.title;
    product.desc=this.goods.desc;
    product.price=this.goods.realPrice;
    product.iid=this.iid;
    //2 将商品添加到购物车 vuex (返回promise 和 mapActions)
    // this.$store.commit('addCart',product)
    //vuex actions的异步操作
    // this.$store.dispatch('addCart',product).then(res =>{
    //  console.log(res);
    // })
    //映射 mapActions
    this.addCart(product).then(
      res =>{
        // this.isShow= true;
        // this.msg=res
        
        // setTimeout(() => {
        //    this.isShow= false;
        //    this.msg=''
        // }, 1500);
        
        this.$toast.show(res)
        
      }
    )
  }
  

},
}
</script>

<style scoped>
#detail{
  z-index: 9;
  height: 100vh;
  overflow: hidden;
  position: relative;
  
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content{
  position: absolute;
 
  top: 44px;
  bottom:60px ;
   left: 0px;
   right: 0px;
 
 /* touch-action: none; */
}
</style>