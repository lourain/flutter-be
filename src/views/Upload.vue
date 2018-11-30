<template>
	<div class="upload" >
		<form ref="myform">
			<input type="file" name="file1"  multiple @change="readFile"><br>
			<div class="process-line">
				<div class="process" :style="{'width':progressWidth+'%'}"></div>
			</div>
			<input type="submit" value="上传" @click="postData">
		</form>
	</div>
</template>
<script>
export default {
  data() {
    return {
      progressWidth: 0
    };
  },
  methods: {
    readFile(e) {
		console.log(e);
		
	},
    postData(e) {
      e.preventDefault();
      let formList = new FormData(this.$refs.myform);
      const xhr = new XMLHttpRequest();
      xhr.open("post", "/fluttering/upload", true);
      xhr.upload.onprogress = function(e) {
        this.progressWidth = (e.loaded / e.total) * 100;
      }.bind(this);
      xhr.send(formList);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          this.msgBox(res.msg);
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
<style lang="less" scope>
.upload {
  .process-line {
    width: 100px;
    height: 3px;
    border: 1px solid skyblue;
    .process {
      width: 10.0231231231%;
      height: 100%;
      background: skyblue;
    }
  }
}
</style>
