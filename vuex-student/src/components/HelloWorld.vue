<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{List}}</p>
    
    
  </div>
</template>

<script>
import testApi from "@/api/test.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    // console.log(testApi.getList());
    this.fetchData()
  },
  methods: {
    fetchData() {
      testApi
        .getList()
        .then((res) => {
          this.List=res.data
          console.log("测试结果3", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data(){
    return{
      List:[]
    }

  }
};
</script>


