<template>
  <div class="part-list">
    <a-card class="item-card">
      <a-row>
        <a-col :span="6">
          <h3>所有参与</h3>
          <p>{{analysis[API.PART_STATE_ALL]}}</p>
        </a-col>
        <a-col :span="6">
          <h3>已完成</h3>
          <p>{{analysis[API.PART_STATE_SUCCESS]}}</p>
        </a-col>
        <a-col :span="6">
          <h3>进行中</h3>
          <p>{{analysis[API.PART_STATE_ING]}}</p>
        </a-col>
        <a-col :span="6">
          <h3>审核中</h3>
          <p>{{analysis[API.PART_STATE_CHECK]}}</p>
        </a-col>
      </a-row>
    </a-card>

    <a-card class="item-card">
      <div slot="title">
        <span style="line-height: 32px">参与列表</span>
        <a-button-group class="act-list-btn-grp">
          <a-button :class="{active:PART_state==utils.PART_STATE_ALL}"
                    @click="checkState(utils.PART_STATE_ALL)">所有</a-button>
          <a-button :class="{active:PART_state==utils.PART_STATE_SUCCESS}"
                    @click="checkState(utils.PART_STATE_SUCCESS)">已完成</a-button>
          <a-button :class="{active:PART_state==utils.PART_STATE_ING}"
                    @click="checkState(utils.PART_STATE_ING)">进行中</a-button>
          <a-button :class="{active:PART_state==utils.PART_STATE_CHECK}"
                    @click="checkState(utils.PART_STATE_CHECK)">审核中</a-button>
          <a-input-search class="search—input" placeholder="检索内容"/>
        </a-button-group>
      </div>
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
                  :description="item.act.describe==''?'暂无描述信息':item.act.describe"
          >
            <a slot="title" href="#">
              {{ item.act.name }}
            <router-link :to="'/partake/'+item.id" style="float: right">前往详情</router-link>
            </a>
            <a-avatar
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
     <div style="text-align: center">
       <a-pagination
               :total="page.count"
               v-model="page.curr"
               :page-size="page.size"
               @change="pageChange"
               v-if="page.count>0"
               @showSizeChange="pageChange"
               :page-size-options="['1','2','3','5','10','20','30']"
               show-size-changer show-quick-jumper/>

     </div>
    </a-card>
  </div>
</template>

<script>
  import {PART_STATE_ALL} from "@/js/utils";
  let  utils =require("../js/utils")


  import Vue from "vue"
  import {Card, Row, Col, Button, List, Avatar, Pagination, Input} from "ant-design-vue";
  let mods = {Card, Row, Col, Button, List, Avatar, Pagination, Input}
  for(let key in mods){
    let str = key.replace(/([A-Z])/g,"-$&").toLowerCase();
    str= str.replace(/^-*/g,"")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/"+str+"/style/css");
  }
  export default {
    name: "partakeList",
    data() {
      return {
        data:[],
        utils,
        API:utils,
        PART_state:PART_STATE_ALL,
        analysis:{
          [utils.PART_STATE_ING]:0,
          [utils.PART_STATE_ALL]:0,
          [utils.PART_STATE_SUCCESS]:0,
          [utils.PART_STATE_CHECK]:0,
        },
        page:{curr:1,size:10,total:0}
      }
    },
    methods:{
      checkState(state){
        if (state==this.PART_state) return;
        this.PART_state = state;
        this.pageChange(this.page.curr,this.page.size);
      },
      pageChange(curr,size){
        let context = this;
        this.page.curr=curr;
        this.page.size=size;
        this.utils.getMyPartListByState(this.PART_state,this.page,function (data) {
          context.data = data.data;
          context.page.curr=data.curr;
          context.page.size=data.size;
          context.page.count=data.count;

        })
      }
    },
    mounted(){
      if (this.$route.params.state!=null){
        this.PART_state = this.$route.params.state;
      }
      this.pageChange(this.page.curr,this.page.size);

      this.API.getUserPartAnalysis(data=> {
          this.analysis[this.API.PART_STATE_ALL]=data.data.reduce((a,b)=>{
            this.analysis[b.state]=b.count;
           return a+b.count
          },0)
      })
    },


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

  @media screen and (max-width: 768px) {
    .search—input {
      display: none !important;

    }
    .act-list-btn-grp{
      clear: both;
      margin: 0 auto;
    }
  }
</style>
