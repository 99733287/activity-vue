<template>
  <div>

    <a-card style="margin-bottom: 20px" v-if="activity!=null">
      <ActItem :item="activity"/>
    </a-card>
    <a-alert v-if="activity!=null&&activity.state!=API.ACT_STATE_CREATE" message="仅限状态为：创建，可进行表单项的修改" type="warning" show-icon  style="margin-bottom: 20px"/>

   <question-item class="item" v-for="item in list" :item="item" @OnDeleteFormItem="deleteActFormItem"></question-item>
  <a-card>
    <router-link  :to="'/dashboard/'+$route.params.act">  <a-button > <a-icon type="left" />返回仪表盘 </a-button></router-link>
    <a-button type="primary"  style="margin-left: 20px" :disabled="activity!=null&&activity.state!=API.ACT_STATE_CREATE"  @click="showModal"> 添加表单项目 </a-button>

  </a-card>
    <a-modal v-model="visible" title="添加项目" @ok="handleOk">
      <div style="text-align: center">
        <a-spin :spinning="spinning" ></a-spin>
      </div>
     <question-create  ref="questionCreate" ></question-create>
    </a-modal>

  </div>

</template>

<script>
  import Vue from "vue"
  import {Card,Input,Form,Tag,Icon,Button,Modal,Spin,Alert} from "ant-design-vue";
  import optionItem from "@/components/optionItem";
  import QuestionItem from "@/components/QuestionItem";
  import QuestionCreate from "@/components/QuestionCreate";
  import ActItem from "@/components/ActItem";
  let mods ={Card,Input,Form,Tag,Icon,Button,Modal,Spin,Alert}

  Vue.use(optionItem)
  for(let key in mods){
    let str = key.replace(/([A-Z])/g,"-$&").toLowerCase();
    str= str.replace(/^-*/g,"")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/"+str+"/style/css");
  }
 export default {
    components: {ActItem, QuestionCreate, QuestionItem, optionItem},
    data(){
      return {
        visible:false,
        fold:false,
        API:require("../js/utils"),
        activity:null,
        spinning:false,
        list:[]
        }
    },
    methods:{
      handleOk(e){
        console.log(e);
        if (this.$refs.questionCreate.check()) {
          let item =this.$refs.questionCreate.getItem();
          this.upload2Server(item);
        }
        else {
          this.$message.error("请正确填写");
        }
      },
      showModal() {
        this.visible = true;
      },
      deleteActFormItem(item){
        console.log(item);
        this.list=this.list.filter((e)=>item!=e);
      //  此处删除item 待实现
      },
      upload2Server(item){
        this.spinning =true;
        let context = this;
        this.API.saveActForm(this.$route.params.act,item,(data=>{
          context.spinning =false;
          context.visible=false;
          if (data.code==0){
            context.$message.success("添加成功");
            console.log(data);
            context.$refs.questionCreate.clear()
            context.list.push(data.data);
          }else
          { context.$message.error("失败："+data.msg);}
        }))
      }
    },
    created(){
      let context = this;
      let act = this.$route.params.act;
      if (act!=null&&act!=""){
        this.API.getActInfo(act,function (data) {
        context.activity =data.data;
        })
      this.API.getActFormList(act,function (data) {
        console.log(data);
        context.list = data.data;
      });
      }
    },
    name: "listForm"
  }
</script>

<style scoped>
  .item{
    margin-bottom: 16px;
  }

</style>
