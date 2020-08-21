<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header  class="layout-padding" style="background: none;">
      <div class="logo" style="line-height: 31px;text-align: center;font-size: 25px;font-weight: 400">Activity</div>
      <a-menu
              mode="horizontal"
              v-model="nav"
              :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/">
          <router-link to="/">主页</router-link>
        </a-menu-item>
        <a-menu-item key="/list">
          <router-link to="/list">活动列表</router-link>
        </a-menu-item>
        <a-menu-item key="/user">
          <router-link to="/user">个人中心</router-link>
        </a-menu-item>
        <a-menu-item key="/about">
          <router-link to="/about">关于</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content  class="layout-padding"  style="padding-top: 16px">
      <div :style="{ minHeight: '280px' }">
        <slot style="text-align: center">
            <h1 style="font-size: 30px;text-align: center">404</h1>
          <span>页面飞走了 <router-link to="/">返回主页</router-link></span>
        </slot>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
     天天活动 基于 ant Design Vue &copy; <a href="http://5keo.com">yuyoyo.cn</a>
    </a-layout-footer>
  </a-layout>
</template>
<style>
  #components-layout-demo-top .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
  .layout-padding{
    padding: 0 16px;
  }

  .layout-padding.ant-layout-header{
    padding: 0 16px;
    position: sticky;
    top: 0;
    z-index: 5;

  }

  @media screen and (max-width: 500px) {
     .logo{
       display: none;
     }

    .layout-padding{
      padding:0
    }
    .layout-padding.ant-layout-header{
      padding: 0;

    }
  }
</style>

<script>
  import Vue from "vue"
  import {Layout,Menu,Breadcrumb} from "ant-design-vue"
  import "ant-design-vue/lib/layout/style/css"
  import "ant-design-vue/lib/menu/style/css"
  import "ant-design-vue/lib/breadcrumb/style/css"
  Vue.use(Layout);
  Vue.use(Menu);
  Vue.use(Breadcrumb);

  export default {
    name: "navTab",
    data(){
      return {
        nav:["/"]
      }
    },
    created(){
      this.$router.afterEach((to,from)=>{
        this.nav[0]=to.path;
      });
      this.nav[0]=(this.$route.path)
    }
  }
</script>
