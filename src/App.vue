<template>
  	<div id="app">
	  	<el-container>
			<el-header>风满楼</el-header>
			<el-main>
				<el-form :label-position="labelPosition" label-width="80px" :model="formData">
					<el-form-item label="用户名" >
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input  type="password" v-model="formData.pwd"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitLogin(formData)">登录</el-button>
					</el-form-item>
				</el-form>
			</el-main>
	  	</el-container>
  	</div>
</template>

<script>

export default {
  name: "app",
  components: {},
  data() {
    return {
      labelPosition: "right",
      formData: {
        name: "",
        pwd: "",
      }
    };
  },
  methods:{
	  submitLogin(params) {
		  let opts = {
			  method:'POST',
			  body:JSON.stringify(params),
			  mode:'cors',
			  headers:{
				  'Content-Type':'application/json'
			  }
		  }
		  fetch('/fluttering/login',opts)
		  	.then(res=>{
				  return res.json()
			  })
			.then(data=>{
				console.log(data);
				const token = data.token
				
			})
			.catch(err=>{
				console.log(err);
				
			})
	  }
  }
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
    .el-header {
      text-align: left;
      font-size: 20px;
      line-height: 2.5;
      color: #fff;
      background-color: #10aec2;
	}
	.el-main{
		.el-form{
			margin: 0 auto;
			width: 30%;
			
		}
	}
  }
}
</style>
