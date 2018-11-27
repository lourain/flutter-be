<template>
	<div class="article-page">
		<form action="" method="post">
			<div class="title">
				<input type="text" placeholder="标题" name="title" v-model="article.title">
			</div>
			<div class="tags">
				<input type="text" placeholder="标签1" name="tag1" v-model="article.tags[0]">
				<input type="text" placeholder="标签2" name="tag2" v-model="article.tags[1]">
				<input type="text" placeholder="标签3" name="tag3" v-model="article.tags[2]">
			</div>
			<mavon-editor v-model="article.content"/>
			<button type="button" @click="sendData(article)">提交</button>
		</form>
	</div>	
</template>
<script>
import request from "../request";
export default {
  data() {
    return {
      article: {
        title: "",
        tags: [],
        content: ""
      },
      id: ""
    };
  },
  created() {
    this.editData();
  },
  methods: {
    editData() {
      this.id = location.href.split("=")[1];
      request("GET", `/fluttering/edit?id=${this.id}`).then(res => {
        this.article = res.data;
      });
    },
    sendData(params) {
      request("POST", `/fluttering/post`, params).then(res => {
		// alert(res.msg);
		this.msgBox()
      });
    }
  },
  msgBox() {
    this.$alert("这是一段内容", "标题名称", {
      confirmButtonText: "确定",
      callback: action => {
        this.$message({
          type: "info",
          message: `action: ${action}`
        });
      }
    });
  }
};
</script>
<style lang="less" scoped>
.article-page {
}
</style>
