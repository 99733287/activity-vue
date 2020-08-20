<template>
  <div>
    <a-card>
      <a-descriptions class="act-list-item" ref="descriptions" v-if="item!=null">
        <div slot="title">
          <a-avatar icon="user" size="small"/>
          <span style="margin-left: 4px">
            {{item.name}}
          </span>
          <a-tag color="#2db7f5" style="float: right">
            {{API.ACT_STATE_CREATE==item.state?'创建':API.ACT_STATE_TASK==item.state?'进行中':'已完结'}}
          </a-tag>
        </div>
        <a-descriptions-item label="描述" :span="3">
           <span>
             {{item.describe==''?'暂无描述信息':item.describe}}
           </span>
        </a-descriptions-item>

        <a-descriptions-item label="报名人数">
          {{item.participants}}
        </a-descriptions-item>
        <a-descriptions-item label="招募人数">
          {{item.recruited==-1?'无限制':item.recruited}}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {{date2Str(item.createTime)}}
        </a-descriptions-item>
        <a-descriptions-item label="截止时间">
          {{date2Str(item.endTime)}}
        </a-descriptions-item>

      </a-descriptions>
    </a-card>

    <a-alert v-if="partake!=null&&partake.state!=API.PART_STATE_ING" :message="'状态: '+API.PART_STATE[partake.state]+' \t仅限状态为：任务中，可进行表单填写'" type="warning" show-icon  style="margin-top: 20px"/>

    <QuestionInput v-for="it in formList" :item="it" :disabled="formDisabled" ></QuestionInput>
    <a-form-model-item>
      <a-button @click="submitForm">提交</a-button>
    </a-form-model-item>


  </div>
</template>

<script>
  import Vue from "vue"
  import {Card, Button, List, Avatar, Pagination, Descriptions, Tag,Alert} from "ant-design-vue";
  import QuestionInput from "@/components/QuestionInput";

  let mods = {Card, Button, List, Avatar, Pagination, Descriptions, Tag,Alert}
  for (let key in mods) {
    let str = key.replace(/([A-Z])/g, "-$&").toLowerCase();
    str = str.replace(/^-*/g, "")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/" + str + "/style/css");
  }


  let API = require("../js/utils")
  export default {
    name: "partake",
    components: {QuestionInput},
    data() {
      return {
        item: null, API,partake:null,formDisabled:false,
        formList: [],
      }
    },
    created() {
      let context = this;
      this.$router.afterEach((to, from) => {
      });
      let id = this.$route.params.id;
      API.getPartake(id, function (data) {
        context.item = data.data.act;
        context.partake=data.data;
        context.formDisabled =data.data.state!=API.PART_STATE_ING;

        API.getActFormList(data.data.act.id, (data => {
          context.formList = data.data;
          API.getPartFormBypartake(id, data => {
            let obj = {};
            data.data.map((e)=>{
              obj[e.actForm.id]=e.optionList.map((o)=>o.id);
              if (e.actForm.type==API.FORM_TYPE_WRITE){
                obj[e.actForm.id]=e.value;
              };
              if (e.actForm.type==API.FORM_TYPE_SINGEL){
                if (obj[e.actForm.id].length==1)
                  obj[e.actForm.id]=obj[e.actForm.id][0];
              };
            });

            context.formList.map((e)=>{
              e.value =obj[e.id];
            });
            let list = context.formList;
            context.formList = JSON.parse(JSON.stringify(list));

          });
        }))
      });



    },
    methods: {
      submitForm() {

        let data = {};
        let flag = true;
        this.formList.map((e) => {
          if (e.value != null)
            data[e.id] = e.value
          if (e.value == null || e.value == "") flag = false;
          if (typeof e.value == "Array" && e.value.length == 0)
            flag = false;
        });
        if (!flag)
         return  console.log("请求填写完整")
        // let req = {};
        // for(let key in data){
        //   let val =data[key];
        //   if (typeof  val=="number")
        //     val = new String(val);
        //   if (val instanceof  Array)
        //   {
        //     console.log("arr")
        //     let arr=[];
        //     val.map(e=>arr.push(new String(e)));
        //     val = arr;
        //   }
        //   req[key]=val;
        //
        //
        // }
        // console.log(req)
        API.submitActForm(this.$route.params.id,data ,(data)=>{
          if (data.code==0){
           this.$message.success("提交成功")
          }else
            this.$message.error("失败："+data.msg+"  错误代码："+data.code)
        })
      }
    }
  }
</script>

<style scoped>

</style>
