<template>
    <div class="album">
        <ul>
            <li v-for="(album, index) in albums" :key="index">
                <router-link :to="'/photo?id='+album._id">
                    <img class="cover-pic" :src="'http://localhost:9999'+album.urls[0]" width="100px"/>
                    <div class="album-name">{{album.album_name}}</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import request from "../request";
export default {
  data() {
    return {
      albums: []
    };
  },
  created() {
    this.showAlbums();
  },
  methods: {
    showAlbums() {
      request("get", "/api/albums").then(res => {
          if(res.code===1111){
              this.msgBox(res.msg,'/login')
          }
        this.albums = res.data;
        
      });
    },
    msgBox(msg, path) {
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
.album {
  ul {
    display: flex;
    li {
      list-style: none;
      margin-right: 20px;
    }
  }
}
</style>