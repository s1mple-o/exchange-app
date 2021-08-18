<template>
	<view class="container">
		<view class="help">
			<form >
			           <textarea type="text" value="" placeholder="请输入您遇到的问题"v-model="text"/>
			           <button  type="primary" @click="submitHelp">Submit</button>  
			</form> 
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:''
			}
		},
		methods: {
			submitHelp:function(){
				var _self = this
				uni.request({
					url:'https://www.agnitoken.com/api/app.php?s=App.Agni.Feedback',
					method:'POST',
					dataType:'json',
					data:{
						text:_self.text,
						
					},
					success:function(res){
						if(res.data.ret==200){
							uni.showToast({ title: '发送成功',icon:'none' });
							_self.text = ''
						}
						
					},fail:function(res){
						 uni.showToast({ title: '发送失败',icon:'none' });
					}
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		display: flex;
		justify-content: center;
	}
.help{
	width: 92%;
	margin-top: 60upx;
}
textarea{
	
	width: 100%;
	height: 240upx;
	padding: 30upx;
	box-sizing: border-box;	
	margin-bottom: 60upx;
	border: 1px solid #DCDFE6;
	border-radius: 10upx;
}
</style>
