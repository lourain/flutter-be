<template>
	<div class="over-view">
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
  computed:{
	  
  },
  methods: {
    getArt() {
      request("GET", "/fluttering/titles").then(res => {
		  console.log(res);
		  
		//   res.data.forEach(element => {

		// 	   element.content = marked(element.content || '',{sanitize: true})
		//   });
		  this.titles = res.data
		  

      });
    }
  }
};
</script>
<style lang="less">
	.over-view{
		.article{
			a{
				text-decoration: none;
				color: #666;
			}
			.tags,.time{
				box-sizing: border-box;
				padding: 0 2em;
				text-align: left;
				margin: 10px 0;
			}
			.markdown{
				text-align: left;
				// text-indent: 2em;
				color:#666;
				pre{
					margin: 15px 0;
					background:rgba(0, 0, 0, .1);
				}
				p{
					margin: 15px 0;
				}
			}
			
		}
	}
</style>
