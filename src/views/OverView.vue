<template>
	<div class="over-view">
		<div class="search">
			<input type="text">
			
		</div>
		<div class="article" v-for="(titles,index) in titles" :key="index">
            <router-link :to="'/article?id=' + titles._id">{{titles.title}}</router-link>
		</div>
        <img src="/20180725.jpg" alt="">
	</div>
</template>
<script>
import request from "../request.js";
const marked = require('marked')
const EXPIRED = 1111
export default {
  data() {
    return {
		titles:[]
	};
  },
  created() {
    this.getArt();
  },
  methods: {
    getArt() {
      request("GET", "/api/titles").then(res => {
		if(res.code===EXPIRED){
			this.msgBox(res.msg,'/login')			
		}else{
			this.titles = res.data
		}
		
      });
	},
	msgBox(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        callback: action => {
        	this.$router.push('/login')
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
	.over-view{
		.article{
			text-align: left;
		}
	}
</style>
