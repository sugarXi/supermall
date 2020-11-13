<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control ref="tabControl1" :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
     class="tab-control"
     v-show="isTabFixed"
      ></tab-control>
    <!--   @pullingUp='loadMore' class="tab-control"-->
    <scroll class="content" 
    ref="scroll" :probe-type='3'
     @scroll='contentScroll'
     :pull-up-load='true'
     @pullingUp='loadMore'
     >
   <home-swiper :banners="banners" @swiperImgLoad='swiperImgLoad' />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
     
      ></tab-control>
      <good-list :goods="showGood" />
    </scroll>
   
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    
  </div>
</template>

<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodList from "../../components/content/goods/GoodList";

//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultisata, getHomeGoods } from "network/home";
import {debounce} from 'common/utils'
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodList,

    NavBar,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result:null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,

    };
  },
  computed: {
    showGood() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1 请求多个数据
    this.getHomeMultisata1();
    //2请求商品数据
    this.getHomeGoods1("pop");
    this.getHomeGoods1("new");
    this.getHomeGoods1("sell");
    
  },
  mounted() {
    //3监听item图片加载是否完成
    const refresh= debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImgLoad',()=>{
    refresh()
      // this.$refs.scroll.refresh()
        // console.log('--------itemImgLoad');
    })
    //获取tabControl的offsetTop距离
    // this.tabOffsetTop=this.$refs.tabControl.$el
   
  },
 
  destroyed() {
    console.log('destroyed');
  },
  activated() {
   
    //  console.log(this.$refs.scroll.scroll);
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
  },
  deactivated() {
  
 this.saveY=this.$refs.scroll.getScrollY()
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultisata1() {
      getHomeMultisata().then((res) => {
        // console.log(res);
        // this.result=res
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods1(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
       
        // 完成再次加载更多 
        this.$refs.scroll.finishPullUp()

      });
    },
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      //  console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //吸顶效果 文字颜色下划线颜色保持一致
    this.$refs.tabControl1.currentIndex=index;
    this.$refs.tabControl2.currentIndex=index;
    },
    //点击回到顶部
     backClick(){
    // console.log('回到顶部');
   
    this.$refs.scroll.scrollTo(0,0)
  },
  //内容滚动
  contentScroll(position){
    //1 判断backtop是否显示
    this.isShowBackTop=(-position.y)>1000
    //2 决定tabControl 是否吸顶(position:fixed)
    this.isTabFixed=(-position.y)>this.tabOffsetTop
  },
 
  //加载更多
  loadMore(){
    // console.log('加载更多');
     this.getHomeGoods1(this.currentType)
   
   
  },
  //监听轮播图是否加载完成
  swiperImgLoad(){

   this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
  }
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* height: 100vh;
  position: relative; */
}
.home-nav {
  width: 100%;
  background-color: var(--color-tint);
  color: #fff;
  /* 浏览器原生滚动是位置定位 导航不随之一起滚动*/
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content{
   overflow: hidden;
  
 
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 吸顶样式 */
.tab-control{
  position: relative;
  z-index: 9;
}
/* .content{
 height: calc(100% - 93px);
 overflow: hidden;
 margin-top: 51px;
} */
</style>