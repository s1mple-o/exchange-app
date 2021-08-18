<template>
	<view class="detail">
		<!--顶部返回按钮-->
		<text class="back-btn iconfont iconzuo" @tap="navBack"></text>
		<view class="detail-top bg-active">
			<view class="circle">

			</view>
			<view class="txt-top">
				<view class="item">
					<text class="txt-cont">{{LimitTotalSupply*0.00000001}}亿AG</text>
					<text class="txt-title txt-cont">预发行总量</text>
				</view>
				<view class="item">
					<text class="txt-cont">{{TotalSupply}}AG</text>
					<text class="txt-title txt-cont">在网流通总量</text>
				</view>


			</view>
			<view class="txt-bot">
				<view class="item">
					<text class="txt-cont"> {{sumAG}}AG</text>
					<text class="txt-title txt-cont">我的总量</text>
				</view>
				<view class="item">
					<text class="txt-cont">{{currentAg}}AG</text>
					<text class="txt-title txt-cont">当前可用</text>
				</view>
				<view class="item">
					<text class="txt-cont">{{pmctt}}</text>
					<text class="txt-title txt-cont">剩余积分</text>
				</view>
			</view>
		</view>
		<view class="detail-type-content">
			<!-- <image class="login-bg" src="/static/login-bg.png" :style="{height: tabCurrentIndex === 1 ? '100%' : '100%'}"></image> -->
			<view class="main" style="padding-bottom: 80rpx;">
				<view class="nav-bar">
					<view class="nav-bar-item" v-for="(item, index) in typeList" :key="index"
						:class="tabCurrentIndex === index ? 'nav-bar-item-active text-active' : ''"
						@tap="tabClick(index)">
						{{ item.text }}
					</view>
				</view>
				<block v-if="tabCurrentIndex === 0">
					<view class="detail-type-form">
						<!-- <view class="input-item">
							<text class="iconfont iconzhanghuffffffpx"></text>
							<input class="detail-type-input" type="number" name="mobile" v-model="loginParams.mobile"
								placeholder="请输入数量" maxlength="11" />
						</view> -->

						<view class="container">
							<view class="percent-box" style="width: 100%;">
								<progress-line :percent="percent" @moveEvent="moveEvent" :levlEnd="pmctt"
									v-if="hackReset"></progress-line>
							</view>
							<view class="per-txt">
								<input type="number" v-model="multiple" class="pmectt-input" />
							</view>
						</view>
					</view>


					<button class="confirm-btn bg-active" @tap="toLogin">
						兑换
					</button>
				</block>
				<block v-if="tabCurrentIndex === 1">
					<view class="detail-type-form" v-for="(item,index) in hashList" :key="index">

						<view class="item" @click="copyHash(item.hash)">
							<text class="hash">{{item.hash}}</text>
							<text class="time-box">{{item.date}}</text>
						</view>

					</view>

				</block>
			</view>
			<!-- 加载框 -->
			<view class="loading" v-if="loading">
				<image src="../../static/loading.gif" mode=""></image>
			</view>
		</view>
		<!-- 兑换弹出框 -->
		<uni-popup ref="exchange" type="dialog">
			<uni-popup-dialog mode="base" message="成功消息" :content='hash' :duration="2000" :before-close="true"
				@close="exchClose" @confirm="exchconfirm">
			</uni-popup-dialog>

		</uni-popup>
		<view class="uni-p-b-98"></view>
		<tabBar :pagePath="'/pages/shop/detail'"></tabBar>
	</view>


</template>
<script>
	import progressLine from "@/components/progress-line/progress-line.vue"
	export default {
		data() {
			return {
				multiple: 0,
				percent: 0,
				loginParams: {

				},
				registerParams: {

				},
				btnLoading: false,
				reqBody: {},
				loginByPass: true,
				smsCodeBtnDisabled: true,
				userInfo: null,
				appName: 'APP',
				tabCurrentIndex: 0,
				typeList: [{
						text: '兑换'
					},
					{
						text: '记录'
					}
				],
				sumAG: 0,
				currentAg: 0,
				pmctt: 0,
				userInfo: {},
				wallet_address: '',
				hackReset: true,
				hash: '',
				hashList: [],
				TotalSupply: 0,
				LimitTotalSupply: 0,
				loading: false
			};
		},
		components: {
			progressLine,

		},
		watch: {


		},
		onLoad(options) {
			var _self = this;
			this.tabCurrentIndex = parseInt(options.type || 0, 10);



			uni.request({
				url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.TotalSupply',
				method: 'POST',
				dataType: 'json',
				data: {

				},
				success: function(res) {
					if (res.data.ret == 200) {
						_self.TotalSupply = res.data.data;
					} else {

					}
				}
			})
			uni.request({
				url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.LimitTotalSupply',
				method: 'POST',
				dataType: 'json',
				data: {

				},
				success: function(res) {
					if (res.data.ret == 200) {
						_self.LimitTotalSupply = res.data.data;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				}
			})
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_self.userInfo = JSON.parse(res.data);



					//积分查询
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.PointInfo',
						method: 'POST',
						dataType: 'json',
						data: {
							user_id: _self.userInfo.user_id,
							token: _self.userInfo.token
						},
						success: function(res) {
							// console.log(res.data.data.pmctt)
							if (res.data.ret == 200) {
								_self.pmctt = parseInt(res.data.data.pmctt);

							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
								un.removeStorage({
									key: 'userInfo'
								})
								un.removeStorage({
									key: 'addressData' + _self.userInfo.user_id
								})
								uni.navigateTo({
									url: '../user/login'
								})
							}
						}
					})
					//余额查询
					//可用查询
					uni.getStorage({
						key: 'addressData' + _self.userInfo.user_id,
						success: function(res) {
							_self.wallet_address = _self.findByDefaultAddress(JSON.parse(res.data)
								.addressList);
							// console.log(_self.wallet_address)
							if (_self.wallet_address) {
								uni.request({
									url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.CanUse',
									method: 'POST',
									dataType: 'json',
									data: {

										wallet_address: _self.wallet_address
									},
									success: function(res) {
										// console.log(res.data)
										if (res.data.ret == 200) {
											_self.currentAg = parseInt(res.data.data);
										} else {
											uni.showToast({
												title: '无钱包地址/地址不正确',
												icon: 'none'
											});
										}
									}
								})
								uni.request({
									url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.BalanceOf',
									method: 'POST',
									dataType: 'json',
									data: {

										wallet_address: _self.wallet_address
									},
									success: function(res) {
										if (res.data.ret == 200) {
											_self.sumAG = parseInt(res.data.data);
										} else {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											});
										}
									}
								})
							}
						},
						fail: (res) => {
							console.log('请求错误')
						}
					})
					uni.getStorage({
						key: 'hashList'+ _self.userInfo.user_id,
						success: function(res) {
							_self.hashList = JSON.parse(res.data).hashList;
					
						},
						fail: (res) => {
							console.log('hashList无缓存')
						}
					})
				},
				fail: (res) => {
					// console.log("请求错误")
				}
			})



			

		},
		onShow() {
			var _self = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_self.userInfo = JSON.parse(res.data);
					// 积分请求
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.PointInfo',
						method: 'POST',
						dataType: 'json',
						data: {
							user_id: _self.userInfo.user_id,
							token: _self.userInfo.token
						},
						success: function(res) {
							// console.log(res.data.data.pmctt)
							if (res.data.ret == 200) {
								_self.pmctt = parseInt(res.data.data.pmctt);
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						}
					})


					// 余额、可用请求

					uni.getStorage({
						key: 'addressData' + _self.userInfo.user_id,
						success: function(res) {
							_self.wallet_address = _self.findByDefaultAddress(JSON.parse(res.data)
								.addressList);

							//判断是否有钱包地址  
							if (_self.wallet_address) {
								uni.request({
									url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.BalanceOf',
									method: 'POST',
									dataType: 'json',
									data: {

										wallet_address: _self.wallet_address
									},
									success: function(res) {
										if (res.data.ret == 200) {
											_self.sumAG = parseInt(res.data.data);
										} else {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											});
										}
									}
								})
								uni.request({
									url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.CanUse',
									method: 'POST',
									dataType: 'json',
									data: {

										wallet_address: _self.wallet_address
									},
									success: function(res) {
										if (res.data.ret == 200) {
											_self.currentAg = parseInt(res.data.data);
										} else {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											});
										}
									}
								})
							}

							uni.request({
								url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.TotalSupply',
								method: 'POST',
								dataType: 'json',
								data: {

								},
								success: function(res) {
									if (res.data.ret == 200) {
										_self.TotalSupply = res.data.data;
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
									}
								}
							})
						},
						fail: (res) => {
							console.log('无地址')
						}
					})


					uni.getStorage({
						key: 'hashList'+_self.userInfo.user_id,
						success: function(res) {
							_self.hashList = JSON.parse(res.data).hashList;
							// console.log(JSON.parse(res.data))

						},
						fail: (res) => {
							console.log('hashList无缓存')
						}
					})
				},
				fail: (res) => {
					_self.userInfo = null,
						_self.pmctt = 0,
						_self.currentAg = 0,
						_self.sumAG = 0

				}
			})


			//
		},
		onUnload() {

		},
		methods: {

			// 数据初始化
			dataInit() {
				var _self = this;
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.PointInfo',
					method: 'POST',
					dataType: 'json',
					data: {
						user_id: _self.userInfo.user_id,
						token: _self.userInfo.token
					},
					success: function(res) {
						if (res.data.ret == 200) {
							_self.pmctt = parseInt(res.data.data.pmctt);
							_self.$forceUpdate();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				})

				//判断是否有钱包地址
				if (_self.wallet_address) {
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.BalanceOf',
						method: 'POST',
						dataType: 'json',
						data: {

							wallet_address: _self.wallet_address
						},
						success: function(res) {
							if (res.data.ret == 200) {
								_self.sumAG = parseInt(res.data.data);
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						}
					})
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.CanUse',
						method: 'POST',
						dataType: 'json',
						data: {

							wallet_address: _self.wallet_address
						},
						success: function(res) {
							if (res.data.ret == 200) {
								_self.currentAg = parseInt(res.data.data);
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						}
					})
				}
			},
			// 返回上一页
			navBack() {
				uni.navigateBack();
			},
			// 统一跳转路由
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			format(fmt, date) { // author: meizz
				var o = {
					"M+": date.getMonth() + 1, // 月份
					"d+": date.getDate(), // 日
					"h+": date.getHours(), // 小时
					"m+": date.getMinutes(), // 分
					"s+": date.getSeconds(), // 秒
					"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
					"S": date.getMilliseconds() // 毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[
						k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			},
			// 积分兑换
			async toLogin() {
				var _self = this;
				var myDate = new Date();

				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						uni.getStorage({
							key: 'addressData' + _self.userInfo.user_id,
							success: function(res) {

								if (JSON.parse(res.data).addressList.length > 0) {
									_self.wallet_address = _self.findByDefaultAddress(JSON
										.parse(res.data).addressList);
									if (_self.multiple > 0) {
										_self.loading = true
										uni.request({
											url: 'https://www.agnitoken.com/api/app.php?s=App.Agni.ToExchange',
											method: 'POST',
											dataType: 'json',
											data: {

												user_id: _self.userInfo.user_id,
												token: _self.userInfo.token,
												num: _self.multiple
											},
											success: function(res) {
												_self.loading = false
												// console.log(res.data.ret)
												if (res.data.ret == 200) {
													console.log(res.data)
													_self.hash = res.data.data;
													_self.exchOpen();
													_self.hashList.unshift({
														hash: res.data
															.data,
														date: _self.format(
															'yyyy-M-d',
															myDate)
													});
													_self.dataInit();
													uni.setStorage({
														key: 'hashList' +
															_self.userInfo
															.user_id,
														data: JSON
															.stringify({
																hashList: _self
																	.hashList
															}),
														success: (res) => {
															console
																.log(
																	"hashList into"
																)
														},
														fail: (res) => {
															console
																.log(
																	'hashList保存失败'
																)
														}
													})
												} else {
													uni.showToast({
														title: res.data
															.msg,
														icon: 'none'
													});
												}
											}
										})
									}
								} else {
									uni.navigateTo({
										url: '../user/user-page/address'
									})
								}




							},
							fail: (res) => {
								uni.navigateTo({
									url: '../user/user-page/address'
								})
							}
						})


					},
					fail: (res) => {
						_self.userInfo = null
						_self.pmctt = 0
						_self.currentAg = 0
						_self.sumAG = 0
						uni.navigateTo({
							url: '../user/login'
						})
					}
				})

			},
			// 切换兑换/哈希
			tabClick(index) {
				this.tabCurrentIndex = index;
			},

			moveEvent(e1, e2) {
				// console.log(e1, e2)
				this.percent = e1
				this.multiple = e2
			},
			findByDefaultAddress(arr) {
				var cur = null;
				try {
					arr.forEach(function(item, index) {
						if (item.isDefault) {
							cur = item.address;
							throw Error();
						}
					})
				} catch (e) {

				}
				return cur;
			},
			exchOpen(hash) {
				this.loading = false
				this.$refs.exchange.hash = this.hash
				this.$refs.exchange.open()
			},
			exchClose() {

				this.$refs.exchange.close()
			},
			exchconfirm() {
				uni.setClipboardData({
					data: this.$refs.exchange.hash,
					success: function() {
						uni.showToast({
							title: '成功复制到剪切板',
							icon: 'none'
						});
					}
				});
				this.$refs.exchange.close()
			},
			copyHash(hash) {
				uni.setClipboardData({
					data: hash,
					success: function() {
						uni.showToast({
							title: '成功复制到剪切板',
							icon: 'none'
						});
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background: #fff;
	}

	.detail {
		width: 100%;
		position: relative;

		.bg-active {

			// background-color: #FA446C;
			color: #fff;
			position: relative;

			.circle {
				width: 100%;
				height: 45vh;
				// background-color: #FA446C;
				background: url(../../static/bg2.jpg) no-repeat center center;
				background-size: cover;
				// border-radius: 100%;
				// position: absolute;
				// bottom: -375rpx;
				// transform: translateX(-200px);
			}

		}

		.text-active,
		.iconfont {
			color: #FA446C;
		}

		.back-btn {
			position: absolute;
			left: 40rpx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40rpx;
			font-size: 48rpx;
			color: #fff;
		}

		.detail-top {
			height: 460rpx;
			position: relative;

			.desc {
				color: #fff;
				position: absolute;
				top: 200rpx;
				left: 40rpx;
				font-size: 48rpx;

				.title {
					font-size: 48rpx;
				}
			}

			.detail-pic {
				position: absolute;
				width: 220rpx;
				height: 270rpx;
				right: 30rpx;
				top: 100rpx;
			}
		}



		.detail-type-content {
			position: relative;
			top: 32rpx;
			height: auto;
			padding-bottom: 80rpx;
			// min-height: 80vw;
			background: url(../../static/login-bg.png) no-repeat center top;
			background-size: 100% 100%;

			.detail-bg {
				width: 94vw;
				height: 94vw;
				margin: 0 3vw;
			}

			.main {
				width: 94vw;
				// position: absolute;
				top: 0;
				left: 3vw;

				.nav-bar {
					display: flex;
					height: 100rpx;
					justify-content: center;
					align-items: center;
					position: relative;
					z-index: 10;

					.nav-bar-item {
						flex: 1;
						display: flex;
						height: 100%;
						line-height: 96rpx;
						font-size: 32rpx;
						display: flex;
						margin: 0 120rpx;
						justify-content: center;
					}

					.nav-bar-item-active {
						border-bottom: 5rpx solid;
					}
				}

				.detail-type-form {
					width: 80%;
					// min-height: 94vw;
					margin: 50rpx auto;
					margin-top: 80rpx;

					.item {
						display: flex;
						justify-content: space-between;

						.hash {
							width: 65%;
							font-size: 18px;

							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;

						}

						.time-box {
							width: 25%;
							font-size: 14px;
							left: 18px;
							display: flex;
							align-items: flex-end;
						}
					}
				}

				.detail-type-tips {
					padding: 0 50rpx;
					display: flex;
					justify-content: space-between;
					font-size: 28upx;
					color: #666;
				}

				.confirm-btn {
					margin-top: 60upx;
					width: 80%;
					height: 80rpx;
					line-height: 80rpx;
					background-color: #FA446C;
				}
			}
		}

		.detail-type-content-2 {

			background-color: #fff;
			border-radius: 30upx;

		}

		.detail-type-bottom {
			width: 100%;
			padding-bottom: 30rpx;
			text-align: center;
			font-size: 32rpx;
		}

		// 发送验证码样式
		.input-item-sms-code {
			.input-wrapper {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.sms-code-btn {
				width: 200upx;
				background-color: #fff;
				display: flex;
				padding: 15upx 0;
				justify-content: center;
				align-items: center;
				border-radius: 12upx;
			}

			.sms-code-resend {
				color: #666;
			}
		}
	}

	.txt-top {
		width: 100%;
		position: absolute;
		top: 18%;
		z-index: 99;
		display: flex;
		justify-content: space-around;

		.item {
			display: flex;
			flex-direction: column;
			text-shadow: 2px 2px 2px #000;

			.txt-cont {
				color: #fff;
				font-size: 22px;
				text-align: center;
				font-weight: 100;
			}

			.txt-title {
				font-size: 14px;
				text-align: center;
			}
		}
	}

	.txt-bot {
		width: 100%;
		position: absolute;
		top: 62%;
		z-index: 99;
		display: flex;
		justify-content: space-around;
		text-shadow: 2px 2px 2px #000;

		.item {
			display: flex;
			flex-direction: column;

			.txt-cont {
				color: #fff;
				font-size: 22px;
				text-align: center;
				font-weight: 100;
			}

			.txt-title {
				font-size: 14px;
				text-align: center;
			}
		}
	}

	.per-txt {
		display: flex;
		justify-content: center;
		padding-top: 30rpx;
	}

	.pmectt-input {
		width: 180upx;
		margin: 30upx 0;
		padding: 10upx 0;
		text-align: center;
		border: 1px solid #e3e3e3;
	}

	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading image {
		width: 40upx;
		height: 40upx;
	}
</style>
