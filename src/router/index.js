import Vue from 'vue'
import VueRouter from 'vue-router'
//导入组件
const Home = () =>import('../views/home/Home.vue')
const Category = () =>import('../views/category/Category.vue')
const Profile = () =>import('../views/profile/Profile.vue')
const Cart = ()=>import('../views/cart/Cart.vue')
const Detail=()=>import('../views/detail/Detail.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: '',
    redirect:'/home'
   
  },{
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
]

const router = new VueRouter({
  // mode: 'history',

  base: process.env.BASE_URL,
  routes
})

export default router
