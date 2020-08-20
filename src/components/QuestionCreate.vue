<template>
  <div>
    <a-form-item label="描述">
      <a-input type="textarea" v-model="des"/>
    </a-form-item>
    <a-form-item>
      <a-radio-group v-model="type" @change="change">
        <a-radio :value="0">单选</a-radio>
        <a-radio :value="1">多选</a-radio>
        <a-radio :value="2">文字输入</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item v-for="(option,i) in list" :label="option.label" v-bind=" formItemLayout " required
                 style="position: relative;padding-right: 20px">
      <a-input type="textarea" v-model="option.value"/>
      <a-icon
              v-if="list.length > 2"
              class="dynamic-delete-button"
              type="minus-circle-o"
              :disabled="list.length === 2"
              @click="delteItem(i)"
      />
    </a-form-item>

    <a-form-item v-if="type!=3">
      <a-button type="dashed" block @click="add">
        <a-icon type="plus"/>
        添加选项
      </a-button>
    </a-form-item>

  </div>
</template>

<script>
  import Vue from "vue"
  import {Input, Form, Radio} from "ant-design-vue";

  let mods = {Input, Form, Radio}
  for (let key in mods) {
    let str = key.replace(/([A-Z])/g, "-$&").toLowerCase();
    str = str.replace(/^-*/g, "")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/" + str + "/style/css");
  }

  let list = [{label: "A", value: ''}, {label: "B", value: ''}];
  let type = 0;
  export default {
    name: "QuestionCreate"
    , data() {
      return {
        list, type, des: ""
        , formItemLayout: {
          labelCol: {
            xs: {span: 24},
            sm: {span: 2},
          },
          wrapperCol: {
            xs: {span: 24},
            sm: {span: 22},
          },
        },
        formItemLayoutWithOutLabel: {
          wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 20, offset: 4},
          },
        },
      }
    }
    , methods: {
      add() {
        this.list.push({label: String.fromCharCode("A".charCodeAt(0) + this.list.length), value: ""})
      },
      delteItem(i) {
        var arr = [];
        for (let key = 0; key < this.list.length; key++) {
          if (key == i) continue;
          let item = list[key];
          item.label = String.fromCharCode("A".charCodeAt(0) + arr.length);
          arr.push(item);
        }
        this.list = arr;
      },
      change(e) {
        if (e.target.value == 2) {
          this.list = [];
        } else if (this.list.length == 0) {
          this.list[0] = {label: "A", value: ''}
          this.list[1] = {label: "B", value: ''}
        }
      },
      getAndClear() {
        let result = JSON.parse(JSON.stringify({name: this.des, optionList: this.list, type: this.type}));
        this.clear();
        return result;
      },
      getItem() {
        let result = JSON.parse(JSON.stringify({name: this.des, optionList: this.list, type: this.type}));
        return result;
      },
      clear() {
        this.des = "";
        this.list = [{label: "A", value: ''}, {label: "B", value: ''}];
      },
      check(){
        if (this.des.trim()=="") return  false;
        for (let item of this.list) {
               if (item.value.trim()=="") return  false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>
  .dynamic-delete-button {
    cursor: pointer;
    position: absolute;
    top: 0;
    margin-top: -12px;
    left: 100%;
    margin-left: 8px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
  }

  .dynamic-delete-button:hover {
    color: #777;
  }

  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
