<template>
	<div class="upload">
		<form action="http://localhost:9999/upload" method="post" enctype="multipart/form-data" @submit="postData" ref="myform">
			<input type="file" name="file1">
			<input type="submit" value="上传" >
		</form>
	</div>
</template>
<script>
	export default {
		methods:{
			postData(e) {
				console.log(this.$refs.myform);
				e.preventDefault();
				return false
			}
		}
	}
</script>
<style lang="less">
	
</style>
