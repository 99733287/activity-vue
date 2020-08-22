<template>
  <a-card :bordered="false">
    <div class="register—area">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input
                  v-decorator="[
          'username',
          {
            rules: [
              {
                required: true,
                message: '请输用户名',
              },
            ],
          },
        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout">
      <span slot="label">
        昵称&nbsp;
        <a-tooltip title="代表您的名称">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
          <a-input
                  v-decorator="[
          'fullName',
          {
            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
          },
        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input
                  v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '邮箱格式不正确',
              },
              {
                required: true,
                message: '请输入邮箱',
              },
            ],
          },
        ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
          <a-input
                  v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
                  type="password"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
          <a-input
                  v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认密码',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
                  type="password"
                  @blur="handleConfirmBlur"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="手机号">
          <a-input
                  v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入手机号码' }],
          },
        ]"
                  style="width: 100%"
          >
            <a-select
                    slot="addonBefore"
                    v-decorator="['prefix', { initialValue: '86' }]"
                    style="width: 70px"
            >
              <a-select-option value="86">
                +86
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox name="agreement" v-model="agree" >
            我已阅读
            <a href="#" @click="modal1Visible=true">
              使用协议
            </a>
          </a-checkbox>
          <span style="margin-left: 50px">
         已有账户
      <router-link to="/login">前往登录</router-link>
     </span>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit">
            确认注册
          </a-button>
        </a-form-item>
      </a-form>
      <a-modal
              title="请确认是否同意协议"
              style="top: 20px;"
              :visible="modal1Visible"
              @ok="() => setModal1Visible('ok')"
              @cancel="() => setModal1Visible('cancel')"
      >
        <p>隐私协议：将使用您的所有数据</p>
        <p>异议处理：联系管理员,给予用户数据永久删除</p>
        <p>须知：目前版本为测试版，不确保用户数据完整性，因需求随时下线，且永久销毁数据</p>
      </a-modal>
    </div>
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
    name:'register',
    data() {
      return {
        agree:false,
        API:require("../js/utils"),
        modal1Visible:false,
        confirmDirty: false,
        autoCompleteResult: [],
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        },
        tailFormItemLayout: {
          wrapperCol: {
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 8,
            },
          },
        },
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'register' });
    },
    methods: {
      setModal1Visible(type){
        console.log(type);

        if (type=="ok")
        {  this.agree=true;}
          else
             {  this.agree=false;}
       this.modal1Visible=false;
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            if (!this.agree){
              this.$message.warn("请同意用户使用协议");
              return;
            }
            console.log('Received values of form: ', values);
            this.API.register(values,data=>{
              console.log(data);
              if (data.code==0){
                this.$message.success("注册成功");
                this.router.replace("/login");
              }else {
                this.$message.error("失败："+data.msg);
              }
            })
          }
        });
      },
      handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码不一致');
        } else {
          callback();
        }
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      },
      handleWebsiteChange(value) {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.autoCompleteResult = autoCompleteResult;
      },
    },
  };
</script>

<style scoped>
  .register—area{
    max-width: 800px;
    margin: 0 auto;
    padding: 16px;
  }
</style>
