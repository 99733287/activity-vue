<template>
  <div style="position: relative;">
    <div style="position: absolute;padding: 8px "><h3><slot name="label">{{label}}</slot></h3></div>
    <div style="margin-left: 32px;padding: 8px">
      <slot>
        {{value}}
      </slot>
    </div>
  </div>
</template>

<script>
  import Vue from "vue"
  import {Row, Col} from "ant-design-vue";

  let mods = {Row, Col}
  for (let key in mods) {
    let str = key.replace(/([A-Z])/g, "-$&").toLowerCase();
    str = str.replace(/^-*/g, "")
    Vue.use(mods[key]);
    import("ant-design-vue/lib/" + str + "/style/css");
  }

  export default {
    name: "optionItem",
    data() {
      return {
        des: "样说过，不幸可能成为通向幸福的桥梁。这句话语虽然很短，但令我浮想联翩。 在这种困难的抉择下，本人思来想去，寝食难安。 问题的关键究竟为何？ 可是，即使是这样，一天掉多少根头发的出现仍然代表了一定的意义。 在这种困难的抉择下，本人思来想去，寝食难安。 一天掉多少根头发的发生，到底需要如何做到，不一天掉多少根头发的发生，又会如何产生。 那么， 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 对我个人而言，一天掉多少根头发不仅仅是一个重大的事件，还可能会改变我的人生。 现在，解决一天掉多少根头发的问题，是非常非常重要的。 所以， 塞内加在不经意间这样说过，勇气通往天堂，怯懦通往地狱。带着这句话，"
      }
    },
    props:["label","value"]
  }
</script>

<style scoped>

</style>
