<template>
  <a-card>
    <div slot="title" style="position: relative;margin-right: 60px" >
      <div style="overflow: hidden;  text-overflow: ellipsis;">
        <a-tag color="#2db7f5">{{item.type==0?'单选':item.type==1?'多选':item.type==2?'键入文本':'未知类型'}}</a-tag>
        <span v-if="fold">{{item.name}}</span>
      </div>
      <div style="position: absolute;left: 100%;width: 60px;text-align: right;top: 0">

         <span class="cmd" style="margin-right: 8px" >
            <a-popconfirm placement="left" ok-text="确定" cancel-text="取消" @confirm="delateConfirm($event,item)">
              <template slot="title">
                <p>确定需要删除该表单项吗？</p>
              </template>
               <a-icon type="delete"  />
            </a-popconfirm>
         </span>
           <span class="cmd" >
            <a-icon  :type="!fold?'down':'left'" @click="fold=!fold"/>
          </span>
      </div>
    </div>
    <div v-if="!fold">
      <p>
        <slot style="margin-right:1em" name="index"></slot>
        {{item.name}}
      </p>

      <optionItem
              :label="String.fromCharCode('A'.charCodeAt(0) +index)"
              :value="option.value"
              v-for="(option,index) in item.optionList"
      />
    </div>
  </a-card>
</template>

<script>
  import Vue from "vue"
  import {Card,Input,Form,Tag,Icon,Popconfirm} from "ant-design-vue";
  import optionItem from "@/components/optionItem";
  let mods ={Card,Input,Form,Tag,Icon,Popconfirm}

  Vue.use(optionItem)
  for(let key in mods){
    let str = key.replace(/([A-Z])/g,"-$&").toLowerCase();
    str= str.replace(/^-*/g,"")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/"+str+"/style/css");
  }

  export default {
    components: {optionItem},
    props:["item"],
    data(){
      return {
        fold:false,
      }
    },
    methods:{
      delateConfirm(type,item){
        this.$emit("OnDeleteFormItem",item)
      }
    },
    name: "QuestionItem"
  }
</script>

<style scoped>
  .cmd{
    padding: 5px;
  }
  .cmd:hover{
    border-radius: 50%;
    background: rgba(0,0,0,0.05);
  }
</style>
