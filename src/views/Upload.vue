<template>
	<div class="upload" >
		<form ref="myform">
			<input type="file" name="file1"  multiple @change="readFile"><br>
			<div class="process-line">
				<div class="process" :style="{'width':progressWidth+'%'}"></div>
			</div>
			<input type="submit" value="上传" @click="postData">
		</form>

        <img  alt="" v-for="(src,index) in srcs" :key="index" :src="src">

	</div>
</template>
<script>
import request from '../request'
import { log, isObject } from 'util';
const EXPIRED = 1111
export default {
  data() {
    return {
      progressWidth: 0,
      srcs:[]
    };
  },
  methods: {
    readFile(e) {
        let files = e.target.files
        
        for (const file of files) {
            this.srcs.push(URL.createObjectURL(file))
        }
        
        
	},
    postData(e) {
      e.preventDefault();
      let formList = new FormData(this.$refs.myform);
      const xhr = new XMLHttpRequest();
	  xhr.open("post", "/fluttering/upload", true);
	  
      xhr.upload.onprogress = function(e) {
        this.progressWidth = (e.loaded / e.total) * 100;
      }.bind(this);
      xhr.setRequestHeader("Authorization",localStorage.flutter_token)
      xhr.send(formList);
      xhr.onreadystatechange = () => {
		  console.log(xhr.readyState);
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          this.msgBox(res.msg,'/');
        }
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 401) {
          let res = JSON.parse(xhr.responseText);
          this.msgBox(res.msg,'/login');
        }
      };
    },
    msgBox(msg,path) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$router.push(path);
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
.upload {
    text-align: left;
    form{
        input{
            margin: 30px;
        }
    }
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
  img{
      width: 100px;
      margin-right: 10px;
  }
}
</style>
