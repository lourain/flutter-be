<template>
	<div class="home-default">
		<h1>标题</h1>
		<div class="tags">
			<el-tag>标签一</el-tag>
		</div>
		<div class="time">1231</div>
		<div class="content">12313123</div>
	</div>
</template>
<script>
import request from '../request.js'
	export default{
		data(){
			return {

			}
		},
		created() {
			this.getArt()
		},
		methods:{
			getArt(){
				request('GET','/fluttering/articles')
					.then(data=>{
						console.log(data);
						
					})
			}
		}
	}
</script>
<style lang="less" scoped>

</style>
