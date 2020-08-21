<template>
<div>
  <a-card  :bordered="false">
    <div>
      <div style="width: 300px;text-align: center;margin: 0 auto">
        <a-avatar :size="64" :src="logo" shape="circle"/>
        <div>
          <h2 style="margin-top: 20px">天天活动</h2>
          <p>欢迎来到这个世界，你好，我爱这个世界！</p>
        </div>
      </div>
    </div>
  </a-card>
</div>
</template>

<script>
  import Vue from "vue"
  import {Card,Tag,Icon,Modal,Avatar} from "ant-design-vue";
  let mods ={Card,Tag,Icon,Modal,Avatar}
 import logo from "../assets/logo.png";

  for(let key in mods){
    let str = key.replace(/([A-Z])/g,"-$&").toLowerCase();
    str= str.replace(/^-*/g,"")
    Vue.use(mods[key]);
    //import("ant-design-vue/lib/"+str+"/style/css");
  }

  export default {
    data(){
      return {
        logo
      }
    },
    name: "about"
  }
</script>

<style scoped>

</style>
