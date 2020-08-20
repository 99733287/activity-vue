<template>
  <div class="part-list">
    <a-card class="item-card">
      <a-row>
        <a-col :span="6">
          <h3>所有活动</h3>
          <p>669</p>
        </a-col>
        <a-col :span="6">
          <h3>已完成</h3>
          <p>23</p>
        </a-col>
        <a-col :span="6">
          <h3>进行中</h3>
          <p>123</p>
        </a-col>
        <a-col :span="6">
          <h3>创建</h3>
          <p>69</p>
        </a-col>
      </a-row>
    </a-card>

    <a-card class="item-card">
      <div slot="title">
        <span style="line-height: 32px">活动列表</span>
        <a-button-group class="act-list-btn-grp">
          <a-button :class="{active:ACT_state==utils.ACT_STATE_ALL}"
                    @click="checkState(utils.ACT_STATE_ALL)">所有</a-button>
          <a-button :class="{active:ACT_state==utils.ACT_STATE_FINISH}"
                    @click="checkState(utils.ACT_STATE_FINISH)">已完成</a-button>
          <a-button :class="{active:ACT_state==utils.ACT_STATE_TASK}"
                    @click="checkState(utils.ACT_STATE_TASK)">进行中</a-button>
          <a-button :class="{active:ACT_state==utils.ACT_STATE_CREATE}"
                    @click="checkState(utils.ACT_STATE_CREATE)">创建</a-button>
          <a-input-search class="search—input" placeholder="检索内容"/>
        </a-button-group>
      </div>
      <a-list size="large" >
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-descriptions class="act-list-item" ref="descriptions" >
            <div slot="title" >
              <a-avatar icon="user" size="small" /> <span style="margin-left: 4px">
            {{item.name}}
          </span>
              <a-tag color="#2db7f5" style="float: right">{{utils.ACT_STATE[item.state]}}</a-tag>
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

            <a-descriptions-item  >
              <router-link :to="'/dashboard/'+item.id"><a-button>前往控制台</a-button></router-link>
            </a-descriptions-item>


          </a-descriptions>
        </a-list-item>
      </a-list>
     <div style="text-align: center">
       <a-pagination
               :total="page.count"
               v-model="page.curr"
               :page-size="page.size"
               @change="pageChange"
               @showSizeChange="pageChange"
               :page-size-options="['1','2','3','5','10','20','30']"
               show-size-changer show-quick-jumper/>
     </div>
    </a-card>

  </div>
</template>

<script>
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  const utils = require("../js/utils")
  import Vue from "vue"
  import {Card, Row, Col, Button, List, Avatar, Pagination, Input,Progress,Dropdown,Icon,Tag,Descriptions} from "ant-design-vue";

  let mods = {Card, Row, Col, Button, List, Avatar, Pagination, Input,Progress,Dropdown,Icon,Tag,Descriptions}
  for (let key in mods) {
    Vue.use(mods[key]);
  }


  for (let key in mods) {
    import("ant-design-vue/lib/" + key.toLowerCase() + "/style/css");
  }
  export default {
    name: "activityList",
    data() {
      return {utils,data,page:{count:0,curr:1,size:10},ACT_state:utils.ACT_STATE_ALL}
    },
    methods:{
      pageChange(page,size){
        let context =this;
        this.page.size=size;
        this.page.curr=page;
        utils.getMyActListByState(this.ACT_state,{curr:page,size:size},function (data) {
          context.data=data.data;
          context.page.count=data.count;
          context.page.curr=data.curr;
        })
      },
      checkState(state){
        if (state==utils.ACT_STATE) return;
        this.ACT_state =state;
        this.pageChange(1,this.page.size);
      }
    },
    created(){
      this.ACT_state=this.$route.params.state==null?this.ACT_state:this.$route.params.state
      this.pageChange(this.page.curr,this.page.size);
    }
  }
</script>

<style scoped>
  .part-list .item-card {
    margin-bottom: 20px;
  }

  .act-list-btn-grp{
    float: right;
  }

  .search—input {
    margin-left: 16px !important;
    width: 200px
  }

  @media screen and (max-width: 850px) {
    .search—input {
      display: none !important;

    }
    .act-list-btn-grp{
      clear: both;
      margin: 0 auto;
    }
    .list-content{
     width: 100% !important;
    }
    .content-title-desc{
      width: 100%;
    }
  }

  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
    margin-left: 20px;}

  .list-content-item  span {
    line-height: 20px;
  }


  .list-content-item  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }

</style>
