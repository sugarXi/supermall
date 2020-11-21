import {debounce} from './utils';
import {POP, NEW, SELL} from "./const";
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin={
  data() {
    return {
      itemImgListener:null
    }
  },
  mounted() {
     // 2 监听goodlist组件推荐图片加载
   const refresh= debounce(this.$refs.scroll.refresh,200)
   this.itemImgListener = ()=>{ refresh()}
  this.$bus.$on('itemImgLoad',this.itemImgListener)
  
  },

}
export const backTopMixin ={
  data() {
    return {
      isShowBackTop:false,
    }
  },
  methods: {
     //点击回到顶部
     backClick(){
      // console.log('回到顶部');
     
      this.$refs.scroll.scrollTo(0,0)
    },
  },
  components:{
    BackTop
  }

}
export const tabControlMixin={
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
   
    } 
  },
}