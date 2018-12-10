<template>
    <div class="album">
        <ul>
            <li v-for="(album, index) in albums" :key="index">
                <img class="cover-pic" :src="'http://localhost:9999'+album.urls[0]" width="100px"/>
                <div class="album-name">{{album.album_name}}</div>
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
      request("get", "/fluttering/albums").then(res => {
        this.albums = res.data;
        console.log(this.albums);
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