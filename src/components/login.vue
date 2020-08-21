<template >
  <a-card :bordered="false" class="login-form-area" v-cloak>
    <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
                v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
                placeholder="用户名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
                v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]"
                type="password"
                placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
                v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
        >
          记住登录
        </a-checkbox>
        <a class="login-form-forgot" href="">
          忘记密码？
        </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          登 录
        </a-button>
        没有账户？
       <router-link to="/register">注册新账户</router-link>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>

  import Vue from  "vue";
  import {Form,Modal,Button,Input,Card,Icon,Tooltip,Select,Col,Row,Checkbox} from "ant-design-vue"

  let mods = {Form,Modal,Button,Input,Card,Icon,Tooltip,Select,Col,Row,Checkbox};
  for(let key in mods){
    Vue.use(mods[key]);
  }
  for(let key in mods){
    import("ant-design-vue/lib/"+key.toLowerCase()+"/style/css");
  }


  export default {
    "name":"login",
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      handleSubmit(e) {
        let context = this;

        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            console.log(this)
            this.$.ajax({
              url:"/user/login"
              ,contentType:"application/json"
              ,type:"json"
              ,data:JSON.stringify(values),
              success:function (data) {
                if (data.code==0){
                  console.log("成功");
                  context.$router.replace("/user")
                }else {
                  context.$message.error(data.msg);
                }
                console.log(data);
              },
              error:function (data) {
                console.log(data);
              }
            })
          }
        });
      },
    },
  };
</script>
<style>
  .login-form-area .login-form {
    margin: 0 auto;
    max-width: 600px;
  }
  .login-form-area .login-form-forgot {
    float: right;
  }
  .login-form-area .login-form-button {
    width: 100%;
  }

  .login-form-area{
    padding: 16px
  }
  [v-cloak]{
    display: none;
  }
</style>
