import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=> import('@/views/Login.vue'),
    
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('@/components/register'),
    
  },
  {
    path:'/message',
    name:'Message',
    component: ()=>import('@/views/Message.vue'),
    meta: {
      TabbarShow: true // 需要显示 底部导航
   },
  },
  {
    path:'/contacts',
    name:'Contacts',
    component: ()=>import('@/views/Contacts.vue'),
    meta: {
      TabbarShow: true // 需要显示 底部导航
   },
  },
  {
    path:'/userInfo',
    name:'UserInfo',
    component: ()=>import('@/components/contacts/UserInfo'),
  },
  {
    path:'/addFriends',
    name:'AddFriends',
    component: ()=>import('@/components/contacts/AddFriends'),
  },
  {
    path:'/ask',
    name:'Ask',
    component: ()=>import('@/components/contacts/Ask'),
  },
  {
    path:'/askInfo',
    name:'AskInfo',
    component: ()=>import('@/components/contacts/AskInfo'),
  },
  {
    path:'/searchUser',
    name:'SearchUser',
    component: ()=>import('@/components/contacts/SearchUser'),
  },
  {
    path:'/apply',
    name:'Apply',
    component: ()=>import('@/components/contacts/Apply'),
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: ()=> import('@/components/Dialog'),
    
  },
  {
    path: '/speech',
    name: 'Speech',
    component: ()=> import('@/components/message/Speech'),
    
  },
  {
    path: '/video',
    name: 'Video',
    component: ()=> import('@/components/message/Video'),
    
  },
  {
    path:'/find',
    name:'Find',
    component: ()=>import('@/views/Find.vue'),
    meta: {
      TabbarShow: true // 需要显示 底部导航
   },
  },
  {
    path:'/firendship',
    name:'Firendship',
    component: ()=>import('@/components/find/Firendship'),
  },
  {
    path:'/mine',
    name:'Mine',
    component: ()=>import('@/views/Mine.vue'),
    meta: {
      TabbarShow: true // 需要显示 底部导航
   },
  },
  {
    path:'/seting',
    name:'Seting',
    component: ()=>import('@/components/mine/Seting'),
  },
  {
    path:'/setPic',
    name:'SetPic',
    component: ()=>import('@/components/mine/SetPic'),
  }
]
const router = new VueRouter({
  mode:'hash',
  routes
})
export default router
