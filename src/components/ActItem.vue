<template>
  <a-descriptions class="act-list-item" ref="descriptions" v-if="item!=null" >
    <div slot="title" >
      <a-avatar icon="user" size="small" /> <span style="margin-left: 4px">
            {{item.name}}
          </span>
      <a-tag color="#2db7f5" style="float: right">{{API.ACT_STATE_CREATE==item.state?'创建':API.ACT_STATE_TASK==item.state?'进行中':'已完结'}}</a-tag>
    </div>
    <a-descriptions-item label="描述" :span="3" >
           <span>
             {{item.describe==''?'暂无描述信息':item.describe}}
           </span>
    </a-descriptions-item>

    <a-descriptions-item label="报名人数" >
      {{item.participants}}
    </a-descriptions-item>
    <a-descriptions-item label="招募人数" >
      {{item.recruited==-1?'无限制':item.recruited}}
    </a-descriptions-item>
    <a-descriptions-item  label="创建时间">
      {{date2Str(item.createTime)}}
    </a-descriptions-item>
    <a-descriptions-item  label="截止时间">
      {{date2Str(item.endTime)}}
    </a-descriptions-item>

  </a-descriptions>

</template>

<script>
  import Vue from "vue"
  import { Avatar,Descriptions,Tag} from "ant-design-vue";
  let mods = { Avatar,Descriptions,Tag}
  for(let key in mods){
    let str = key.replace(/([A-Z])/g,"-$&").toLowerCase();
    str= str.replace(/^-*/g,"")
    Vue.use(mods[key]);
   // import("ant-design-vue/lib/"+str+"/style/css");
  }

  export default {
    name: "ActItem",
    data(){
      return {API:require("../js/utils")}
    },
    props:{item:null}
  }
</script>

<style scoped>

</style>
