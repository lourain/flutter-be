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
export default {
  data() {
    return {
      article: {
        title: "",
        tags: [],
        content: ""
      }
    };
  },
  methods: {
    sendData(params) {
      let opts = {
        method: "POST",
        body: JSON.stringify(params),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("/fluttering/post", opts)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.article-page {
}
</style>
