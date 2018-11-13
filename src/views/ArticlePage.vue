<template>
	<div class="article-page">
		<form action="">
			<div class="title">
				<input type="text" placeholder="标题" name="title">
			</div>
			<div class="tags">
				<input type="text" placeholder="标签1" name="tag1">
				<input type="text" placeholder="标签2" name="tag2">
				<input type="text" placeholder="标签3" name="tag3">
			</div>
			<mavon-editor v-model="value"/>
			<input type="submit" value="提交">
		</form>
	</div>	
</template>
<script>
export default {
	data() {
		return {
			value:''
		}
	}
};
</script>
<style lang="less" scoped>
.article-page {
}
</style>
