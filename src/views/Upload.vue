<template>
	<div class="upload" >
		<form ref="myform">
			<input type="file" name="file1" accept="image/*" multiple >
			<input type="submit" value="上传" @click="postData">
		</form>
	</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    postData(e) {
      e.preventDefault();
      let formList = new FormData(this.$refs.myform);
      const xhr = new XMLHttpRequest();
      xhr.open("post", "/fluttering/upload", true);
      xhr.send(formList);
      xhr.onreadystatechange = ()=>{
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
		  
		  let res = JSON.parse(xhr.responseText)
		  this.msgBox(res.msg)
        }
      };
    },
    msgBox(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>
