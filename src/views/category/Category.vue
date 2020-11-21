<template>
<div id="category">
 <nav-bar class="nav-bar">
    <div slot="center">商品分类</div>
  </nav-bar>
  <div class="content">
<tab-menu :categories='categories'  @selectItem="selectItem">></tab-menu>
<scroll id="tab-content" ref="scroll" >
  <div>
<tab-content-category
:subcategories ='showSubcategory'></tab-content-category>
<tab-control ref="tabControl" :titles="['综合', '新品', '销量']"
      @tabClick="tabClick" ></tab-control>
      <tab-content-detail :categoryDetail='showCategoryDetail'></tab-content-detail>
  </div>

</scroll>
  </div>
</div>
 
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
 import Scroll from 'components/common/scroll/Scroll'
import TabContentCategory from './childComps/TabContentCategory'
import TabControl from "components/content/tabControl/TabControl";
import  TabContentDetail from './childComps/TabContentDetail';

import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
import {POP, SELL, NEW}  from 'common/const'
import {tabControlMixin} from 'common/mixin'
export default {
 
name:'Category',
components:{
  NavBar,
  TabMenu,
  Scroll,
  TabContentCategory,
  TabControl,
  TabContentDetail,

},
mixins:[tabControlMixin],
data() {
  return {
    categories:[],
    currentIndex:-1,
    categoryData:{}
  }
},
activated() {
this.$refs.scroll.refresh()
},
computed:{
  showSubcategory(){
if(this.currentIndex ===-1) return{}
return this.categoryData[this.currentIndex].subcategories
  },
  showCategoryDetail(){
    if (this.currentIndex ==-1) return []
    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
  }
},
created() {
  // 1.请求分类数据
      this._getCategory()
},
methods: {
  selectItem(index){
   this._getSubcategories(index)
  },
  _getCategory(){
 
    getCategory().then(
      res=>{
        //1 获取分类数据
        this.categories = res.data.category.list
        //2 初始化 每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i]={
             subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
          }
          
        }
        //3 请求第一个分类数据
        this._getSubcategories(0)
      }
    )
  },
  _getSubcategories(index){
    this.currentIndex =index;
    const mailKey=this.categories[index].maitKey;
    getSubcategory(mailKey).then(
      res=>{
        this.categoryData[index].subcategories=res.data
        this.categoryData={...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      }
    )
  },
  _getCategoryDetail(type){
    //1 获取请求的miniWallKey
    const miniWallKey = this.categories[this.currentIndex].miniWallkey
    
   //2 发送请求 传入 miniWallKey和type
    getCategoryDetail(miniWallKey,type).then(
      res=>{
        //3 获取数据进行保存
        this.categoryData[this.currentIndex].categoryDetail[type]=res
        this.categoryData={...this.categoryData}
      }
    )
  },
  
},
}
</script scoped>

<style scoped>
#category{
  height: calc(100% - 49px);
  overflow: hidden;
}
.nav-bar{
background-color: var(--color-tint);
color: #fff;
}
.content{
  position: absolute;
  left: 0;
right: 0;
top: 44px;
bottom: 49px;
display: flex;
}
#tab-content{
height: 100%;
flex: 1;
overflow: hidden;

}
</style>