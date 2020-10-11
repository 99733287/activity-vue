<template>
  <div>
    <a-modal
        title="更新密码"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="close"
    >
      <a-form-item>
        <a-input ref="userNameInput" v-model="old" placeholder="旧密码" type="password">
          <a-icon slot="prefix" type="unlock"/>
        </a-input>

      </a-form-item>
      <a-form-item>
        <a-input ref="userNameInput" v-model="psw" placeholder="新密码" type="password">
          <a-icon slot="prefix" type="lock"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input ref="userNameInput" v-model="conf" placeholder="确认密码" type="password">
          <a-icon slot="prefix" type="lock"/>
        </a-input>
      </a-form-item>
    </a-modal>
  </div>
</template>

<script>
import {Modal, Button, Input, Icon, Form} from "ant-design-vue";
import Vue from "vue";

let mods = {Modal, Button, Input, Icon, Form}
for (let key in mods) {
  Vue.use(mods[key]);
}
let utils =require("../js/utils");

export default {
  name: "updatePsw",
  data() {
    return {
      ModalText: 'Content of the modal',
      confirmLoading: false,
      old: "",
      psw: "",
      conf: "",
      utils
    };
  },
  props: ["visible"],
  methods: {
    handleOk(e) {
      if (this.psw.trim() == "" || this.conf.trim() == "" || this.old == "") {
        console.log("输入为空");
        return
      }

      if (this.conf != this.psw) {
        console.log("两次密码不一致")
        return
      }
      this.confirmLoading = true;
      this.utils.changePassword(this.psw,this.old,(data)=>{
        console.log(data);
        if (data.code!=0){
         this.$message.error(data.msg);
        }else{
          this.$router.replace("/login");
        }
        this.confirmLoading = false;
      })
    },
    close() {
      this.$emit("close")
    }
    , open() {
      this.$emit("open")
    }
  },

}
</script>

<style scoped>

</style>