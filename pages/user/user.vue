<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="!login ? '../../static/user/user.png' :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">{{login ? uerInfo.name : 'Hi，您未登录'}}</text>
				<text v-if="login" class="integral">{{login ? '当前积分：'+ uerInfo.pmctt : ''}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe624;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item " @click="goUrl('./user-page/address')" v-if="login">
				<text class="list-icon">&#xe6d9;</text>
				<text class="list-text">钱包地址管理</text>
				<text class="navigat-arrow">&#xe624;</text>
			</view>
			<view class="center-list-item" @click="goUrl('./user-page/integral')">
				<text class="list-icon">&#xe607;</text>
				<text class="list-text">积分释放说明</text>
				<text class="navigat-arrow">&#xe624;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item " @click="goUrl('./user-page/help')">
				<text class="list-icon">&#xe704;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe624;</text>
			</view>
			<view class="center-list-item" @click="goUrl('./user-page/privacy')">
				<text class="list-icon">&#xe626;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe624;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="goUrl('./user-page/about')">
				<text class="list-icon">&#xe633;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe624;</text>
			</view>
			<view class="center-list-item" @click="exitLogin" v-if="login">
				<text class="list-icon">&#xe780;</text>
				<text class="list-text">退出登录</text>
				<text class="navigat-arrow">&#xe624;</text>
			</view>
		</view>
		<view class="uni-p-b-98"></view>　　　　　　
		<tabBar :pagePath="'/pages/user/user'"></tabBar>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				login: false,
				avatarUrl: "",
				uerInfo: {
					name:'',
					pmctt:''
				},
				userData:{}
			}
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
					    url: 'login'
					});
				}
			},goUrl(url){
				uni.navigateTo({
				    url: url
				});
			},
			exitLogin(){
				if(this.login){
					uni.showToast({ title: '退出登录',icon:'none' });
				}
				
			
				uni.removeStorage({
					key:'userInfo'
				})
				
				this.login = false;
				uni.redirectTo({
					url:'user'
				})
			}
		},
		
		onShow:function(){
			uni.redirectTo({
				url:'user'
			})
			var _self = this;
			// uni.removeStorage({
			// 	key:'userInfo'
			// })
			uni.getStorage({
			    key: 'userInfo',
			    success: function (res) {
					_self.userData = JSON.parse(res.data);
					// console.log(_self.userData)
					_self.avatarUrl = _self.userData.user_head;
					// console.log(data.user_nick)
			        _self.login = true;
					_self.uerInfo.name = _self.userData.user_nick;
					uni.request({
						url:'https://www.agnitoken.com/api/app.php?s=App.Agni.PointInfo',
						method:'POST',
						dataType:'json',
						data:{
							user_id:_self.userData.user_id,
							token:_self.userData.token,
						},
						success:function(res){
							
							if (res.data.ret == 200) {
								_self.uerInfo.pmctt = parseInt(res.data.data.pmctt);
								
							} else {
								_self.login = false;
								uni.showToast({ title: res.data.msg,icon:'none' });
								
								uni.removeStorage({
									key:'userInfo'
								})
								uni.removeStorage({
									key:'addressData' + _self.userData.user_id
								})
								uni.navigateTo({
									url:'../user/login'
								})
							}
						},fail:function(){
							  _self.login = false;
						}
					})
			    }
			});
		
		},
		onLoad(){
			
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src:url('https://at.alicdn.com/t/font_2669482_i2o5a160cxe.ttf?t=1626135214622') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		/* background-color: #4cd964; */
		background: url(../../static/bg1.jpg) no-repeat center center;
		background-size:  cover;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: flex-start;
		justify-content: space-around;
		flex-direction: column;
		margin-left: 20upx;
		position: relative;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
		text-shadow: 2px 2px 2px #000;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
		position: absolute;
		right: 2vw;
		top: 50%;
		transform: translateY(-50%);
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
	.integral{
		color: #fff;
      text-shadow: 2px 2px 2px #000;
	}
</style>