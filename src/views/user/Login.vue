<template>
  <div class="hello">
    <el-row>
    	<el-col :span="24" class="top">
    		<el-col :span="6" :offset="1">
    			<span>Log</span>
    			<span>in</span>
    		</el-col>
    	</el-col>
    </el-row>
    <el-row class="main" type="flex" justify="center">
    	<el-col :span="4" :xs="16" class="form">
    		<el-form ref="form" :model="form" :rules="rules" label-width="50px">
    			<div class="owl">
    				<div class="arms">
    					<div class="arm"></div>
    					<div class="arm arm-r"></div>
    				</div>
    			</div>
    			<el-row class="form-info">
    				<el-col :span="24">请输入账号、密码登录</el-col>
    			</el-row>
    			<el-form-item label="账号" prop="username">
    				<el-input placeholder="账号" v-model="form.username" clearable ></el-input><!--icon="close" :on-icon-click="clearInput('account')"-->
    			</el-form-item>
    			<el-form-item label="密码" prop="password">
    				<el-input placeholder="密码" v-model="form.password" clearable type="password" @focus="pwdFocusBlur('5px','65px','120px')" @blur="pwdFocusBlur('40px','20px','160px')"></el-input>
    			</el-form-item>
    			<el-form-item>
    				<el-col :span="10">	
    					<el-checkbox v-model="form.remember">7天免登录</el-checkbox>
    				</el-col>
    				<el-col :span="6" :offset="2">
	    				<el-button type="primary" @click="login('form')">登录</el-button>
    				</el-col>
    			</el-form-item>
    		</el-form>
    	</el-col>
    </el-row>
  </div>
</template>

<script>
import { login } from '@/api/login';
//import { setUser } from '@/utils';
export default {
  name: 'Login',
  data () {
    return {
    	form:{
    		'username': '',
      	'password': '',
	      'remember': false
    	},
    	rules:{
    		username: [
    			{ required: true, message: '请输入账号',  trigger: 'blur'},
    			//{ type: 'email',message: '请输入正确的邮箱地址', trigger: 'blur'}
    		],
    		'password':[
    			{ required: true, message: '请输入密码', trigger: 'blur'}
    		]
    	},
      msg: 'this is Login',
    }
  },
  methods:{
  	pwdFocusBlur(top,left,right){
  		var arm = document.querySelector('.arm');
  		var armR = document.querySelector('.arm-r');
  		arm.style.top = top;
  		arm.style.left = left;
  		armR.style.top = top;
  		armR.style.left = right;
  	},
  	login(formName){
  		var _this = this;
  		this.$refs[formName].validate( valid => {
  			if(valid){
  				var par = _this.form;
		  		login(par).then( res => {
		  			console.log(res);
		  			if( res.code === 0 ){
		  				//setUser( _this.form.username , _this.form.remember );
		  				_this.$router.push('/');
		  			}else{
		  				_this.$message.error( res.msg );
		  			}
		  		});
  			}else{
  				return false;
  			}
  		})
  		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	/*@import '../style/common';*/
$imgUrl : '../../assets';
.top{
	height:100px;
	line-height:100px;
	font-size:36px;
	background:url($imgUrl+'/login-bg.png') repeat 0 0;
	color:#fff;
}
.main{
	height:255px;
	background:url($imgUrl+'/login-bg.png') repeat 0 0;
	background-origin: content-box;
}
.form{
	background:#fff;
	padding:40px 20px 20px;
	border:1px solid #ddd;
	position:relative;
	top:100px;
	border-radius:5px;
	box-shadow:0 6px 12px rgba(0,0,0,0.175);
}
.owl{
	width:211px;
	height:108px;
	background:url($imgUrl+'/owl.png') -51px 0 no-repeat;
	position:absolute;
	left:50%;
	top:-100px;
	margin-left:-111px;
	.arms{
		top:58px;
		position:absolute;
		height:40px;
		width:100%;
		overflow: hidden;
		.arm{
			width:40px;
			height:65px;
			background:url($imgUrl+'/owl.png') 0 0 no-repeat;
			position:absolute;
			left:20px;
			top:40px;
			transition: all 0.3s ease;
		}
		.arm-r{
			background:url($imgUrl+'/owl.png') -278px 0 no-repeat;
			left: 160px;
		}
	}
}
.el-input>input{
	border-radius:3px !important;
}
.infomation{
	cursor:text;
	margin:0;
}
.form-info{
	margin-bottom:22px;
	font-size: 0.12rem;
	color:#20a0ff;
	.left{
		padding-left:4px;
		margin-top:-2px;
	}
}

</style>
