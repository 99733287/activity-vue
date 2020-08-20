<template>
  <a-card :bordered="false">
    <div class="register—area">
      <a-form :form="form" @submit="handleSubmit">
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
        <a-form-item v-bind="formItemLayout">
      <span slot="label">
        昵称&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
          <a-input
                  v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
          },
        ]"
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
        <a-form-item
                v-bind="formItemLayout"
                label="邮箱验证"
                extra="用于确认您的信息正确并确保您以后不丢失账户"
        >
          <a-row :gutter="8">
            <a-col :span="12">
              <a-input
                      v-decorator="[
              'captcha',
              { rules: [{ required: true, message: '请输入邮箱验证码!' }] },
            ]"
              />
            </a-col>
            <a-col :span="12">
              <a-button>获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox name="agreement" v-model="agree">
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
        <p>您同意....</p>
        <p>您同意....</p>
        <p>您同意....</p>
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
            console.log('Received values of form: ', values);
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
