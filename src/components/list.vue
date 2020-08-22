<template>
  <div>
    <div class="search">
      <a-input-search placeholder="检索内容" size="large" v-model="searchValue"  enter-button @search="search"/>
    </div>

    <a-card style="margin-top: 20px">
      <a-list
              size="large"
              rowKey="id"
              itemLayout="vertical"
              :dataSource="data"
      >
      <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
        <a-descriptions class="act-list-item" ref="descriptions" >
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

   <a-descriptions-item  >
            <a-button @click="actClick(item)">报名参与</a-button>
          </a-descriptions-item>


        </a-descriptions>
      </a-list-item>
      </a-list>
     <div style="text-align: center">
       <a-pagination
               v-model="current"
               :page-size-options="pageSizeOptions"
               :total="total"
               show-size-changer
               :page-size="pageSize"
               @change="pageChange"
               @showSizeChange="onShowSizeChange"
       >
         <div slot="buildOptionText" slot-scope="props">
           <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
           <span v-if="props.value === '50'">全部</span>
         </div>
       </a-pagination>
     </div>
    </a-card>

    <a-modal v-model="visible" title="活动详情确定参与报名吗" @ok="handleOk">
      <div class="card-body act-card" v-if="selectedAct!=null">
        <div class="act-head">
          <a-avatar size="small" icon="user"  style="margin-right: 8px"/>{{selectedAct.name}} <span style="float: right">参与数:{{selectedAct.participants}}</span>
        </div>
        <p class="act-desc">
          {{selectedAct.describe}}
        </p>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import Vue from "vue"
  let API =require("../js/utils")

  import {Card, Input,List,Tag,Avatar,Descriptions,Button,Pagination,Modal} from "ant-design-vue";

  let mods = {Card, Input,List,Tag,Avatar,Descriptions,Button,Pagination,Modal}
  for (let key in mods) {
    Vue.use(mods[key]);
  }

  for (let key in mods) {
    import("ant-design-vue/lib/" + key.toLowerCase() + "/style/css");
  }

  export default {
    name: "list",
    data(){
      return {
        visible:false,
        searchValue:"",
        pageSizeOptions: ['1','2','5','10', '20', '30', '40', '50'],
        current: 1,
        pageSize: 10,
        total: 50,
        API,
        selectedAct:null,
        data : []
      }
    },
    methods:{
      handleOk(){
        let  context = this;
        this.visible =false;
        console.log(this.selectedAct);
        API.joinAct(this.selectedAct.id,function (data) {
          console.log(data);
          if (data.code!=0){
            context.$message.error("失败:"+data.msg)
          }
        })
      },
      actClick(act){
        this.selectedAct=act;
        this.visible=true;
      },
      onShowSizeChange(current, pageSize) {
        this.pageSize = pageSize;
        this.pageChange(current,pageSize)

      },
      date2Str(date){
        return this.moment(date).format("YYYY-MM-DD HH:mm");
      },
      search(search){
        search = search.trim();
        this.searchValue =search;
        this.$route.query.search=search;
        let arr =[];
        for(let key in this.$route.query){
          if (this.$route.query[key]==null)
            continue
          arr.push(key+"="+this.$route.query[key]);
        }
        window.history.replaceState("","",this.$route.path+"?"+arr.join("&"))
        this.current=1;
        this.pageChange( this.current, this.pageSize);
      },
      pageChange(page,pageSize,search){
        let context = this;
        API.getActListByApi(page,pageSize,this.searchValue,function (data) {
          context.data=data.data;
          context.total=data.count
        })
      }
    },
    mounted(){
      if (typeof this.$route.query.search=="string"){
        this.searchValue = this.$route.query.search;
      }
      this.search(this.searchValue)
    }
  }
</script>

<style scoped>
  .search {
    padding: 0 15%;
  }


  @media screen and  (max-width: 768px) {
    .search {
      padding: 0 8px;
    }
  }
</style>

<style>
  .act-list-item .ant-descriptions-title{
    margin-bottom: 8px;
  }

  .card-body {
    border-radius: 5px;
  }

  .card-body.act-card{
    border-radius: 1px;
  }




  .act-head{
    margin-bottom: 16px;
  }

  .act-desc{
    text-indent: 2em;
    line-height: 20px;
    height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .act-content{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
