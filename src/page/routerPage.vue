<template>
  <navTab>
    <router-view></router-view>
  </navTab>
</template>

<script>
  import navTab from "@/components/navTab.vue";
  export default {
    name: "routerPage",
    components: {navTab},
  }
</script>

<style scoped>

</style>
