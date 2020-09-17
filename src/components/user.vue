<template >
  <div class="data-area user-info">
    <a-card title="个人资料" :bordered="false">
      <div>
        <div style="width: 300px;text-align: center;margin: 0 auto">
          <a-avatar :size="64" icon="user"/>
          <div>
            <h2>Hello world</h2>
            <p>欢迎来到这个世界，你好，我爱这个世界！</p>
          </div>
        </div>
      </div>
    </a-card>

    <a-card title="功能模块" :bordered="false" >
      <div class="btng">

        <router-link class="btn-item" to="/create"> <a-button>创建活动</a-button></router-link>
        <router-link class="btn-item" to="/user/partakeList"> <a-button>参与列表</a-button></router-link>
        <router-link class="btn-item" to="/user/activityList"> <a-button>主持列表</a-button></router-link>
        <router-link class="btn-item" to="/user/partakeList"> <a-button>修改密码</a-button></router-link>
        <a-button @click="logout">退出登录</a-button>
      </div>
    </a-card>


    <a-card title="数据列表" :bordered="false">
      <a-row :gutter="[24,24]">
        <a-col :span="8" v-for="item in list" :key="item.name" :xs="24" :sm="12" :md="8">
           <router-link :to="{name:item.path,params:{state:item.state,aa:'asfafas'}}">
             <a-card class="card-body">
               <a-statistic :value="item.value" :valueStyle="{'padding-left':'20px'}">
                 <div slot="title" style="line-height: 28px;height: 28px">
                   <i class="tag">
                   </i>{{item.name}}
                 </div>
               </a-statistic>
             </a-card>
           </router-link>
        </a-col>

      </a-row>
    </a-card>

    <a-card title="进行中" :bordered="false">
      <div slot="extra" class="ing-btng">
        <router-link  to="/user/partakeList/" >参与列表</router-link>
        <router-link  to="/user/activityList/"> 主持列表</router-link>
      </div>
        <a-row :gutter="[24,24]">
        <a-col :span="8" v-for="i in list" :key="i.name" :xs="24" :sm="12" :md="8">
          <a-card class="card-body act-card">
            <div class="act-head">
              <a-avatar size="small" icon="user"  style="margin-right: 8px"/>上课签到 <span style="float: right">参与数:266</span>
            </div>
            <p class="act-desc">这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助这是本次签到的描述，简单描述使用场景以及相关帮助</p>
            <div>
              <span>骗你学计算机</span>
              <span style="float: right">2020-08-10</span>
            </div>
          </a-card>
        </a-col>

      </a-row>

    </a-card>

  </div>
</template>

<script>
  import Vue from "vue"
  import {Card,Row,Col,Statistic,Avatar,Button,Dropdown} from "ant-design-vue";
  let mods ={Card,Row,Col,Statistic,Avatar,Button}
  for(let key in mods){
    import("ant-design-vue/lib/"+key.toLowerCase()+"/style/css");
  }

  for(let key in mods){
    Vue.use(mods[key]);
  }



  export default {
    name: "user",
    data() {
      return {
        list: [],
        actData:null,
        API:require("../js/utils")
      }
    },
    methods:{
      logout(){
        this.API.logout((data)=>{
           this.$router.replace("/login");
        });
      }
    },
    mounted(){
      let context = this;
      this.API.getMyActData(data=>{
        let mydata = data.data;
        let arr =new Array(6);
        for( let key in mydata){
          let obj = {value:mydata[key],name:"",type:"ACT"}
          let index = 0;
          let state =-1;
          switch (key) {
            case "actAll":
              obj.name = "所有主持";
              index = 0;
              break;
            case "actFinish":
              obj.name = "完结的主持";
              index = 1;
              state = context.API.ACT_STATE_FINISH;
              break;
            case "actIng":
              obj.name = "进行中的主持";
              index = 2;
              state = context.API.ACT_STATE_TASK;
              break;
            case "partAll":
              obj.type = "PART";
              obj.name = "所有参与";
              index = 3;
              break;
            case "partFinish":
              obj.type = "PART";
              obj.name = "完结的参与";
              state=context.API.PART_STATE_SUCCESS;
              index = 4;
              break;
            case "partIng":
              obj.type = "PART";
              obj.name = "进行中的参与";
              state=context.API.PART_STATE_ING
              index = 5;
              break;
          }
          obj.state=state;
          obj.type==="PART"?'':obj.type="ACT";
          obj.path=obj.type==="PART"?"/user/partakeList":"/user/activityList"
          arr[index]=obj;
        }
        context.list=arr;
      })

    }
  }
</script>

<style scoped>

  .tag{
    margin-top:6px;
    margin-right:10px;
    display:block;
    float: left;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #42b983
  }

  .btng  button {
   margin: 0 8px 8px 8px;
  }

  .card-body {
    border-radius: 5px;
  }

  .card-body.act-card{
    border-radius: 1px;
  }


  .card-body:hover {
    position: relative;
    z-index: 1;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, .15);


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

  .user-info>.ant-card:not(:first-child){
    margin-top: 20px;
  }

  .ing-btng>a{
    margin: 0 8px;
  }
  @media screen  and (max-width: 500px){

  }


</style>

<style>
  /*取消卡片头部底线*/
  .user-info .ant-card-head {
    border-bottom: none!important;

  }



</style>

