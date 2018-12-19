<template>
  <div class="login">
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
  </div>
</template>

<script>
// @ is an alias to /src
import request from '../request'
export default {
  name: "login",
  components: {},
  data() {
    return {
      labelPosition: "right",
      formData: {
        name: "",
        pwd: ""
      }
    };
  },
  created(){
	 
  },
  methods: {
    submitLogin(params) {
      request("POST","/api/login",params)
        .then(data => {
			console.log(data);
			
		  const SUCCESS = 0
		  if(data.code !== SUCCESS ){
			  return this.msgBox(data.msg)
		  }
		  localStorage.flutter_token = data.token;
		   this.$router.push('/'); 
        })
	},
	msgBox(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        callback: action => {
        	this.$router.push('/')
        }
      });
    }
  }
};
</script>
<style lang="less">
.login{
    .el-main{
		.el-form{
			margin: 0 auto;
			width: 30%;
			
		}
	}
}
</style>

