<template>
  <div>
    <a-form-model-item v-if="question.type==API.FORM_TYPE_WRITE">
      <a-input v-model="questionList.value" type="textarea"  :disabled="disabled"/>
    </a-form-model-item>
    <a-form-item v-else >
      <a-checkbox-group  v-model="question.value"
                         :name="'q'+question.id"
                         v-if="question.type==API.FORM_TYPE_MUTE">
        <a-form-model-item  v-for="(option,index) in question.optionList">
          <a-checkbox   :name="'q'+question.id"
                        :value="option.id"
                        :disabled="disabled"
                       >
            {{optionLabel(index)}}:{{option.value}}
          </a-checkbox>
        </a-form-model-item>
      </a-checkbox-group>
      <a-radio-group
              v-model="question.value"
              v-if="question.type==API.FORM_TYPE_SINGEL">
        <a-form-model-item title="A" v-for="(option,index) in question.optionList">
        <a-radio :value="option.id"  :disabled="disabled">
          {{optionLabel(index)}}:{{option.value}}
        </a-radio>
        </a-form-model-item>
      </a-radio-group>

    </a-form-item>
  </div>
</template>

<script>
  import Vue from "vue"
  import {FormModel, Input, Checkbox, Radio} from "ant-design-vue";

  let mods = {FormModel, Input, Checkbox, Radio}

  for (let key in mods) {
    let str = key.replace(/([A-Z])/g, "-$&").toLowerCase();
    str = str.replace(/^-*/g, "")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/" + str + "/style/css");
  }

  export default {
    name: "InputOption",
    data() {
      return {
        API: require("../js/utils")
      }
    },
    computed:{
      questionList(){
        let q = this.question;
        if (q==null) return q;
        if (q.type==this.API.FORM_TYPE_MUTE){
          if (q.value==null)
            q.value=[];
        }
        return  q;

      }
    },
    methods: {
      optionLabel(index) {
        let code = 'A'.charCodeAt();
        return String.fromCharCode(code + index);
      }
    }
    , props: {
      question: null,
      disabled:false,
    }
  }
</script>

<style scoped>

</style>
