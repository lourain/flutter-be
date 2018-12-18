<template>
  <div class="upload">
    <form ref="myform">
      相册名：
      <el-button type="primary" @click="createAlbum">{{album_name?album_name:'新建相册'}}</el-button>
      <br>
      <input type="hidden" name="album_name" :value="album_name">
      <div v-show="!album_name && albums_list.length">
        选择已有相册：
        <select name="album_name" id>
          <option
            :value="album.album_name"
            v-for="(album,index) in albums_list"
            :key="index"
          >{{album.album_name}}</option>
        </select>
        <br>
      </div>上传照片：
      <input type="file" name="file1" multiple @change="readFile">
      <br>
      <div class="process-line">
        <div class="process" :style="{'width':progressWidth+'%'}"></div>
      </div>
      <input type="submit" value="上传" @click="postData">
    </form>

    <img alt v-for="(src,index) in srcs" :key="index" :src="src">
  </div>
</template>
<script>
import request from "../request";
import { log, isObject } from "util";
import { Promise, resolve, reject } from "q";
const EXPIRED = 1111;
export default {
  data() {
    return {
      progressWidth: 0,
      srcs: [],
      album_name: "",
      albums_list: [],
      blob_arr: [],
      less_than_size: []
    };
  },
  created() {
    this.getAlbum();
  },
  methods: {
    getAlbum() {
      request("get", "/fluttering/albums").then(albums => {
        this.albums_list = albums.data;
        console.log(albums);
      });
    },
    readFile(e) {
      let files = e.target.files;
      let promise_arr = [];
      for (const file of files) {
        this.srcs.push(URL.createObjectURL(file));
        //size大于800kb就进行压缩
        if (file.size >= 800000) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          promise_arr.push(this.compressImg(reader));
        } else {
          this.less_than_size.push(file);
        }
      }

      Promise.all(promise_arr).then(value => {
        this.blob_arr = value;
      });
    },
    postData(e) {
      e.preventDefault();
      let formList = new FormData(this.$refs.myform);
      formList.delete("file1");
      [...this.blob_arr, ...this.less_than_size].forEach((blob, index) => {
        formList.append("file1", blob, Date.now()+ index + ".webp");
      });
      const xhr = new XMLHttpRequest();
      xhr.open("post", "/fluttering/upload", true);

      xhr.upload.onprogress = function(e) {
        this.progressWidth = (e.loaded / e.total) * 100;
      }.bind(this);
      xhr.setRequestHeader("Authorization", localStorage.flutter_token);
      xhr.send(formList);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          this.msgBox(res.msg, "/");
        }
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 401) {
          let res = JSON.parse(xhr.responseText);
          this.msgBox(res.msg, "/login");
        }
      };
    },
    createAlbum() {
      this.$prompt("请输入新建相册名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S+/,
        inputErrorMessage: "不能为空"
      }).then(({ value }) => {
        this.album_name = value;
        this.$message({
          type: "success",
          message: "相册名: " + value
        });
      });
    },
    msgBox(msg, path) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.$router.push(path);
        }
      });
    },
    compressImg(reader) {
      return new Promise((resolve, reject) => {
        let that = this;
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let img = new Image();

        reader.onload = function(e) {
          img.src = e.target.result;
        };

        img.onload = function() {
          let targetwidth = this.width;
          let targetheight = this.height;

          let maxWidth,
            maxHeight = 800;
          if (this.width / this.height !== maxWidth / maxHeight) {
            targetheight = canvas.height = maxHeight;
            targetwidth = canvas.width =
              (this.width / this.height) * targetheight;
          }
          ctx.drawImage(img, 0, 0, targetwidth, targetheight);
          canvas.toBlob(blob => {
            that._blob = blob;
            resolve(blob);
          });
        };
      });
    }
  }
};
</script>
<style lang="less" scope>
.upload {
  text-align: left;
  form {
    input {
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
  img {
    width: 100px;
    margin-right: 10px;
  }
}
</style>
