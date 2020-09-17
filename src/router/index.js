import VueRouter  from "vue-router";
import  Vue from "vue"


Vue.use(VueRouter);

const  router=new VueRouter({
  mode:"history",
  routes:[
    {path:"/login",component:()=>{return import("../components/login.vue");}},
    {path:"/register",component:()=>{return import("../components/register.vue");}},
    {path:"/user",component:()=>{return import("../components/user.vue");}},
    {path:"/about",component:()=>{return import("../components/about.vue");}},
    {name:"/user/partakeList",path:"/user/partakeList",component:()=>{return import("../components/partakeList.vue");}},
    {name:'/user/activityList',path:"/user/activityList",component:()=>{return import("../components/activityList.vue");}},
    {path:"/dashboard/:act",component:()=>{return import("../components/dashboard.vue");}},
    {path:"/list",component:()=>{return import("../components/list.vue");}},
    {path:"/create",component:()=>{return import("../components/create.vue");}},
    {path:"/listForm/:act",component:()=>{return import("../components/listForm.vue");}},
    {path:"/partake/:id",component:()=>{return import("../components/partake.vue");}},
    {path:"/echart",component:()=>{return import("../components/echart.vue");}},
    {path:"/test",component:()=>{return import("../components/test.vue");}},
    {path:"/",component:()=>{return import("../components/user.vue");}}
  ]
});



export default router

