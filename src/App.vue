<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-page></router-page>
    </a-config-provider>
  </div>
</template>

<script>

  import router from "@/router"
  import Vue from "vue"
  import routerPage from "@/page/routerPage";
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import {ConfigProvider} from 'ant-design-vue';

  Vue.use(ConfigProvider);


  export default {
    name: 'App',
    router,
    data() {
      return {
        locale: zhCN,
      };
    },
    components: {
      routerPage,
    },

  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  body {
    background: #f0f2f5 !important;
  }

</style>
