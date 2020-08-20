<template>
  <div>
    <ul>
      <li v-for="(item,index) in data" @click="()=>{ item.a++; item.b++; item.c++;    }" :key="index">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  const  data= [
    {a:1,b:2,c:3},
    {a:1,b:2,c:3},
    {a:1,b:2,c:3},
    {a:1,b:2,c:3},
    {a:1,b:2,c:3}
  ];

  export default {
    name: "test",
    data:()=>{return {data} }
  }
</script>

<style scoped>

</style>
