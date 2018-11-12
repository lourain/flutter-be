<template>
  <div class="home">
    <el-aside width="200px">
       <ul>
           <li><router-link to="/home/article">文章</router-link></li>
           <li><router-link to="/home/pic">图片</router-link></li>
           <li><router-link to="/home/log">日志</router-link></li>
       </ul>
   </el-aside>
    <el-main>
        <router-view>
            <ShowDetail></ShowDetail>
        </router-view>
    </el-main>
  </div>
</template>

<script>
// @ is an alias to /src
import ShowDetail from "@/components/ShowDetail.vue";
export default {
  name: "home",
  components: {}
};
</script>
<style lang="less">
.home {
  flex: 1;
  min-height: 800px;
  display: flex;
  height: 100%;
  .el-aside {
    height: 100%;
    background: red;
  }
  .el-main{
      background-color:blueviolet;
  }
}
</style>

