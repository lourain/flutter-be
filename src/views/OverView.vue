<template>
	<div class="over-view">
		<div class="search">
			<input type="text">
			
		</div>
		<div class="article" v-for="(titles,index) in titles" :key="index">
			<a :href="'/article?id=' + titles._id">{{titles.title}}</a>
		</div>
	</div>
</template>
<script>
import request from "../request.js";
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
      request("GET", "/fluttering/titles").then(res => {
		  this.titles = res.data
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
