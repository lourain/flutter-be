<template>
  	<div id="app">
	  	<el-container>
			<el-header>风满楼</el-header>
			<router-view></router-view>
	  	</el-container>
  	</div>
</template>

<script>

export default {
  name: "app",
  components: {},

};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    .el-header {
    
      text-align: left;
      font-size: 20px;
      line-height: 2.5;
      color: #fff;
      background-color: #10aec2;
	}
	
  }
}
</style>
