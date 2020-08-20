<template>
  <div>
    <div class="header">
      <a-row>
        <a-col :md="12" :sm="24" :xs="24">
          <a-row type="flex">
            <a-col flex="64px">
              <a-avatar :size="64" icon="user"/>
            </a-col>
            <a-col flex="auto">
              <h2 style="line-height: 64px;margin-left: 8px">{{title}}</h2>
            </a-col>
          </a-row>
        </a-col>
        <a-col :md="12" :sm="24" :xs="24">
          <div class="data" v-if="info!=null">
            <a-statistic class="data-item" title="招募人数" :value="info.recruited=-1?'无限制':info.recruited"
                         style="margin-right: 50px"/>
            <a-statistic class="data-item" title="参与人数" :value="info.participants" style="margin-right: 50px"/>
            <a-statistic class="data-item" title="状态" :value="utils.ACT_STATE[info.state]" style="margin-right: 50px"/>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-card class="card-item" title="功能模块" :bordered="false">
      <div class="btng">
        <router-link :to="'/listForm/'+$route.params.act">
          <a-button>创建表单</a-button>
        </router-link>
        <a-popconfirm placement="top" ok-text="确认"   cancel-text="取消" @confirm="releAct">
          <template slot="title">
            <p>请确认信息是否完整且争取,发布后将不允许修改</p>
          </template>
          <a-button >发布活动</a-button>
        </a-popconfirm>

        <a-popconfirm placement="top" ok-text="确认删除"  okType="danger" cancel-text="取消" @confirm="()=>{log(123)}">
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <template slot="title">
            <p>您确认需要删除活动吗？删除将不会保留任何数据,且不可恢复</p>
          </template>
          <a-button >删除</a-button>
        </a-popconfirm>


      </div>
    </a-card>
    <a-row :gutter="[16,16]" style="margin-top: 16px">
      <a-col :xs="24" :sm="24" :md="18" lg="16">
        <a-card>
          <div slot="title">
            <span>参与列表</span>
            <a-button-group class="act-list-btn-grp" style="float: right">
              <a-button :class="{active:PART_state==utils.PART_STATE_CHECK}"
                        @click="checkState(utils.PART_STATE_CHECK)">待审核
              </a-button>
              <a-button :class="{active:PART_state==utils.PART_STATE_SUCCESS}"
                        @click="checkState(utils.PART_STATE_SUCCESS)">已完成
              </a-button>
            </a-button-group>
          </div>

          <a-list item-layout="horizontal" :data-source="partakeList">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta
              >
                <div slot="description">
                  提交时间：{{item.submitTime}}
                </div>
                <div slot="title">
                  <a>{{item.user.fullName}}</a>
                  <span style="float: right">
                   <a href="#" style="margin-right: 16px" @click="showFormList(item)">查阅</a>
                   <a href="#" style="margin-right: 16px" v-if="item.state==API.PART_STATE_CHECK" @click="resetUserForm(item)">驳回</a>
                   <a href="#" @click="passUserForm(item)"  v-if="item.state==API.PART_STATE_CHECK">通过</a>
                 </span>
                </div>
                <a-avatar slot="avatar" icon="user"/>
              </a-list-item-meta>
            </a-list-item>
          </a-list>

        </a-card>
        <a-card style="margin-top: 20px;" v-for="(item,index) in actFormList" :key="index">
          <div slot="title" style="text-overflow: ellipsis;overflow: hidden">
            <span>({{index+1}}) <a-tag color="#2db7f5">{{item.type==0?'单选':item.type==1?'多选':item.type==2?'键入文本':'未知类型'}}</a-tag></span>
          </div>
          <div>
            <div>
              <a-tabs default-active-key="0" v-if="item.type!=2" @change="tabsChange($event,item,index)">
                <a-tab-pane key="0" tab="描述">
                  <p>
                    <slot style="margin-right:1em" name="index"></slot>
                    {{item.name}}
                  </p>
                  <option-item :label="String.fromCharCode('A'.charCodeAt(0) +index)"
                               :value="option.value"
                               v-for="(option,index) in item.optionList"></option-item>
                </a-tab-pane>
                <a-tab-pane key="1" tab="馅饼图"  >
                <div class="dataView" :id="1+'_'+item.id">
                   <echart :option-list="item.optionList" :data-list="item.analysisList" v-if="item.analysisList!=''"></echart>
                </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="圆环图"  >
                  <div class="dataView" :id="2+'_'+item.id" @ready="e=>{log(e,this.id)}">
                    <echart type="圆环图" :option-list="item.optionList" :data-list="item.analysisList" v-if="item.analysisList!=''"></echart>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="3" tab="柱形图" >
                  <div class="dataView" :id="3+'_'+item.id" >
                    <echart type="柱形图" :option-list="item.optionList" :data-list="item.analysisList" v-if="item.analysisList!=''"></echart>
                  </div>
                </a-tab-pane>
              </a-tabs>
              <div v-if="item.type==2">
                <p>
                  <slot style="margin-right:1em" name="index"></slot>
                  {{item.name}}
                </p>
                <option-item :label="String.fromCharCode('A'.charCodeAt(0) +index)"
                             :value="option.value"
                             v-for="(option,index) in item.optionList">

                </option-item>
              </div>
            </div>
          </div>

        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="6" lg="16">
        <a-card title="效果报告" v-if="baseInfo!=null">
          <div>总完成:
            <a-progress :percent="parseInt(baseInfo.success/baseInfo.recruited*100)"/>
          </div>
          <div>报名进度:
            <a-progress :percent="parseInt(baseInfo.participants/baseInfo.recruited*100)"/>
          </div>
          <div>参与完成度:
            <a-progress :percent="parseInt(baseInfo.success/baseInfo.participants*100)"/>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <div>
      <a-modal
              title="表单查阅"
              :visible="userFormView"
              class="modal"
              @ok="handleOk('ok')"
              @cancel="handleOk('cancel')"
              :bodyStyle="{background:'#f0f2f5'}"
      >
        <div>
          <QuestionInput :item="item" v-for="item in userFormList" :disabled="true"></QuestionInput>
          <a-empty v-if="userFormList.length==0"/>
        </div>
      </a-modal>
    </div>


  </div>


</template>
<style>
  .modal .ant-modal {
    width: 80% !important;

  }

  .modal .ant-modal .ant-modal-body {
    /*background: */
  }

  @media screen and (max-width: 800px) {
    .modal .ant-modal {
      width: 100% !important;
    }
  }
</style>
<script>
  import Vue from "vue"
  import {Card, Avatar, Statistic, Row, Col, Button, Progress, Icon, List, Modal, Empty, Tag, Tabs} from "ant-design-vue";
  import QuestionInput from "@/components/QuestionInput";
  import QuestionItem from "@/components/QuestionItem";
  import OptionItem from "@/components/optionItem";
  import Echart from "@/components/echart";


  const utils = require("../js/utils")
  let mods = {Card, Avatar, Statistic, Row, Col, Button, Progress, Icon, List, Modal, Empty, Tag, Tabs}
  for (let key in mods) {
    Vue.use(mods[key]);
  }

  for (let key in mods) {
    import("ant-design-vue/lib/" + key.toLowerCase() + "/style/css");
  }

  export default {
    name: "dashboard",
    components: {Echart, OptionItem, QuestionItem, QuestionInput},
    data() {
      return {
        window,
        willDelte:null,
        aa:true,
        userFormView: false,
        userFormList: [],
        actFormList: [],
        utils, partakeList: [],
        analysisList:[],
        PART_state: utils.PART_STATE_CHECK,
        title: "活动名称",
        API: require("../js/utils"),
        info: null,
        baseInfo: null,
      }
    },
    computed:{
      showAnalysisList(index){
       console.log(this.analysisList[index]);
        return this.analysisList[index];
      }
    },
    methods: {
      handleOk(type) {
        this.userFormView = false;
        this.userFormList = [];
      },
      tabsChange(key,item,index){
        let context = this;
        this.API.getFormItemAnalysis(item.id,data=>{
        item.analysisList=data.data
        })
      },
      showFormList(partake) {
        this.userFormView = true;
        let context = this;

        let list = [];
        context.API.getActFormList(partake.act.id, (data => {
          list = data.data
          context.API.getPartFormBypartake(partake.id, data => {
            let obj = {};
            data.data.map((e) => {
              obj[e.actForm.id] = e.optionList.map((o) => o.id);
              if (e.actForm.type == context.API.FORM_TYPE_WRITE) {
                obj[e.actForm.id] = e.value;
              }
              ;
              if (e.actForm.type == context.API.FORM_TYPE_SINGEL) {
                if (obj[e.actForm.id].length == 1)
                  obj[e.actForm.id] = obj[e.actForm.id][0];
              }
              ;
            });

            list.map((e) => {
              e.value = obj[e.id];
            });
            let lst = list;
            list = JSON.parse(JSON.stringify(lst));
            context.userFormList = list;
          });
        }))

      },
      releAct() {
        let id = this.$route.params.act;
        this.API.releaseAct(id, (data) => {
          console.log(data);
        })
      },
      checkState(state) {
        if (this.PART_state == state) return;
        this.PART_state = state;
        this.getPartsByState()
      },
      getPartsByState() {
        let context = this;
        utils.getPartsByState(this.$route.params.act, this.PART_state, (data) => {
          console.log(data);
          context.partakeList = data.data;
        })
      },
      resetUserForm(item){
        this.API.partReset(item.id,(data)=>{
          console.log(data);
        });

      },
      passUserForm(item){
        this.API.partPass(item.id,(data)=>{
          console.log(data);
        });
      }
    },
    mounted() {
      setInterval(()=>this.aa=!this.aa,3000)
      let context = this;
      let id = this.$route.params.act;
      if (id != null) {
        utils.getActInfo(id, function (data) {
          console.log(data);
          context.title = data.data.name;
          context.info = data.data;
        });
        context.API.getActFormList(id, data => {
          context.actFormList = data.data.map(e=>{e.analysisList="";return e});
        });
        utils.getActBaseInfo(id, function (data) {
          context.baseInfo = data.data;
        });
        utils.getPartsByState(id, this.PART_state, (data) => {
          console.log(data);
          context.partakeList = data.data;
        })
      }
    }
  }
</script>

<style scoped>

  .header {
    background: white;
    padding: 16px
  }

  .data .data-item {
    float: left;
  }

  .data {
    overflow: auto;
    float: right;
  }

  .act-desc {
    line-height: 14px;
    height: 28px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    margin-bottom: 5px;
    -webkit-box-orient: vertical;
  }

  .btng button {
    margin: 0 8px 8px 8px;
  }

  .card-item {
    margin-top: 16px;
  }

  .right-bottom_btn {
    position: fixed;
    top: 100%;
    left: 100%;
    font-size: 30px;
    margin-left: -80px;
    margin-top: -80px;
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.05);
  }

  .right-bottom_btn:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }

  .right-bottom_btn:hover {
    cursor: pointer;
    color: white;
    background: #1890ff;
  }

</style>
