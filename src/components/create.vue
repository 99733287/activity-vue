<template>
  <div>
    <div>
      <a-modal
              title="创建成功"
              :visible="activity!=null"
              @ok="handleOk('ok')"
              @cancel="handleOk('cancel')"
      >
        <p>是否前往活动的仪表盘进行更多的操作</p>
      </a-modal>
    </div>
    <a-card >
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps-content">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
        <div v-for="input in steps[current].input">
          <div v-if="input.type=='input'">
           <a-form-item :label="input.title" :required="input.required">
             <a-input :placeholder="input.placeholder" :name="input.name" v-model="input.value"/>
           </a-form-item>
          </div>
          <div v-if="input.type=='textarea'">
            <a-form-item :label="input.title" :required="input.required">
              <a-textarea :placeholder="input.placeholder" :name="input.name" v-model="input.value" />
            </a-form-item>
          </div>
        </div>
          <div v-if="steps[current].takeCheck!=null">
            <a-form-item label="开启审核">
              <a-switch v-model="steps[current].checkLevelVal" @change="steps[current].checkLevel=steps[current].checkLevelVal==true?1:0" />
            </a-form-item>

            <a-form-item label="人数限制">
              <a-switch v-model="steps[current].takeCheck.switch" />
            </a-form-item>

            <div v-if="steps[current].takeCheck.switch"  >
              <a-form-item label="人数" :required="steps[current].takeCheck.input.required">
                <a-input v-model="steps[current].takeCheck.input.value" type="number"/>
              </a-form-item>
            </div>

            <div v-if="steps[current].endTime!=null">
              <a-form-item label="结束日期" required >
                <a-date-picker  show-time v-model="steps[current].endTime" />
              </a-form-item>
            </div>
          </div>


        </a-form>
        <div  v-if="current == steps.length - 1" style="max-width: 500px; margin: 40px auto 0;">
          <a-alert
                  :closable="true"
                  message="请再次检查信息是否准确"
                  style="margin-bottom: 24px;"
          />
          <a-form-item v-for="input in steps[0].input"
                  :label="input.title"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                   :required="input.required"
                  class="stepFormText"
          >
           {{input.name=='name'&&input.value.trim()==''?'请填写活动名称':input.name=='describe'&&input.value.trim()==''?'无描述':input.value}}
          </a-form-item>
          <a-form-item
                  label="人数限制"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  class="stepFormText"
          >
            {{steps[1].takeCheck.switch?steps[1].takeCheck.input.value:'无限制'}}
          </a-form-item>
          <a-form-item
                  label="开启审核"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  class="stepFormText"
          >
            {{steps[1].checkLevelVal?'开启':'未开启'}}
          </a-form-item>
          <a-form-item
                  label="结束时间"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  class="stepFormText"
                  required
          >
           {{date2Str(steps[1].endTime,"YYYY-MM-DD HH:mm:ss")}}
          </a-form-item>
        </div>
      </div>
      <div class="steps-action">
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          上一步
        </a-button>
        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
          下一步
        </a-button>
        <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="activityCreate"
        >
          确认提交
        </a-button>
      </div>
    </a-card>
  </div>
</template>
<script>
  import Vue from "vue"
  import {Button,Steps,Card,Input,Form,Switch,InputNumber,DatePicker,Alert,Modal} from "ant-design-vue";
  let mods ={Button,Steps,Card,Input,Form,Switch,InputNumber,DatePicker,Alert,Modal}
  for(let key in mods){
    let str = key.replace(/([A-Z])/g,"-$&").toLowerCase();
    str= str.replace(/^-*/g,"")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/"+str+"/style/css");
  }

  export default {
    name:"create",
    created(){
    },
    data() {
      return {
        current: 0,
        activity:null,
        API:require("../js/utils"),
        labelCol: { lg: { span: 5 }, sm: { span: 5 } },
        wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
        steps: [
          {
            title: '第一步',
            input:[
               {name:'name',title:"活动名称",value:'',type:"input",placeholder:"请输入标题",required:true}
              ,{name:'describe',title:'活动描述',value:'',type:"textarea",placeholder:"请输入描述",required:false}
            ],
            content: 'First-content',
          },
          {
            title: '第二步',
            takeCheck:{
              switch:false,
              input:{name:'',value:'',type:"textarea",placeholder:"请选择人数",required:true},
            },
            endTime:"",
            checkLevel:0,
            checkLevelVal:false,
            content: 'Second-content',
          },
          {
            title: '确认',
            content: 'Last-content',
          },
        ],
      };
    },
    computed:{
      getForm(){
       let  arr =this.steps[0].input;
        console.log(this.steps);
      }
    },
    methods: {
      handleOk(type){
        let act = this.activity;
        this.activity = null;
        this.steps[0].input.map((e)=>e.value="");
        this.steps[1].endTime="";
        this.current=0;
        if (type=="ok"){
          this.$router.push("/dashboard/"+act.id);
        }
      },
      date2Str(date,fmt){
        if (date=="")
          return "请选择日期"
        return this.moment(date).format(fmt);
      },
      activityCreate(){
        let obj={};
       this.steps[0].input.map((e)=>{obj[e.name]=e.value});
        obj.endTime = this.steps[1].endTime;
        obj.recruited=this.steps[1].takeCheck.switch?this.steps[1].takeCheck.input.value:-1;
        obj.checkLevel=this.steps[1].checkLevel;
        for (let key in obj){
          if (key!='describe'&&obj[key]==="")
          {this.$message.error("请检查是否填写准确") ;return}
        }
        obj.endTime = obj.endTime._d.getTime();
       this.API.createAct(obj,(data)=>{
        if(data.code==0){
          this.activity = data.data;
        }
       })
      },
      next() {
        this.current++;
      },
      prev() {
        this.current--;
      },
    },
  };
</script>
<style scoped>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    padding: 16px;

  }

  .steps-action {
    margin-top: 24px;
    text-align: center;
  }
  .steps-action button{
    margin: 0 8px;
  }

</style>
