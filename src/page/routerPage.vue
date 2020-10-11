<template>
  <navTab>
    <div v-if="invalidRoute" style="text-align: center;background: white;padding: 50px">
      <a-result title="404 页面未找到！">
        <template #extra>

            <router-link to="/"><a-button key="console" type="primary">返回主页</a-button></router-link>

        </template>
      </a-result>
    </div>
    <router-view v-else></router-view>
  </navTab>
</template>

<script>
  import navTab from "@/components/navTab.vue";
  import {Result,Button} from "ant-design-vue";
  import Vue from "vue";

  let mods = {Result,Button}
  for (let key in mods) {
    Vue.use(mods[key]);
  }
  export default {
    name: "routerPage",
    computed: {
      invalidRoute () {
        return !this.$route.matched;
      }
    },
    components: {navTab},
  }
</script>

<style scoped>

</style>
