<template>
	<view class="detail">

		<view class="d-box">
			<view class="detail-type-content">
				<!-- <image class="login-bg" src="/static/login-bg.png" :style="{height: tabCurrentIndex === 1 ? '100%' : '100%'}"></image> -->
				<view class="main">
					<view class="nav-bar">
						<view class="nav-bar-item" v-for="(item, index) in typeListTwo" :key="index"
							:class="tabCurrentIndexTwo === index ? 'nav-bar-item-active text-active' : ''"
							@tap="tabClickTwo(index)">
							{{ item.text }}
						</view>
					</view>
					<block v-if="tabCurrentIndexTwo === 0">
						<view class="detail-type-form">

							<view class="container" style="padding-left: 50upx;">
								<view class="page-wrap">

									<!-- <scroll-list ref="list" :option="option" @load="load" @refresh="refresh">
			
										<view class="list-item" v-for="(item,index ) in list" :key="index">
											<view class="item-chekced">
												<evan-checkbox v-model="checkedAllList[index]" shape="square"
													:icon-size='12' @change='change(index)'></evan-checkbox>
											</view>
											<view class="item-id">
			
												{{item.user_id}}
			
											</view>
											<view class="item-ph">
			
			
												{{String(item.username).slice(0,3)+'***'+String(item.username).slice(String(item.username).length-4,String(item.wallet_address).length)}}
											</view>
											<view class="item-addr">
			
												{{String(item.wallet_address).slice(0,3)+'***'+String(item.wallet_address).slice(String(item.wallet_address).length-3,String(item.wallet_address).length)}}
			
											</view>
										</view>
									</scroll-list> -->
									<view class="title">
										<view class="title-checked">
											<evan-checkbox v-model="checked" shape="square" :icon-size='12'
												@change='changeAll'></evan-checkbox>
										</view>
										<!-- <view class="title-id">
											用户ID
										</view> -->
										<view class="title-ph">
											用户电话
										</view>
										<view class="title-addr">
											用户地址
										</view>
									</view>
									<load-refresh ref="loadRefreshT" :isRefresh="true" refreshType="halfCircle"
										color="#fff" fixedHeight='460' backgroundCover="#fff"
										:currentPage="currentPageT" :totalPages="totalPagesT" @loadMore="loadMoreT"
										@refresh="refreshT">

										<view slot="content-list">
											<!-- 数据列表 -->

											<view class="list-item" v-for="(item,index ) in list" :key="index">
												<view class="item-chekced">
													<evan-checkbox v-model="checkedAllList[index]" shape="square"
														:icon-size='12' @change='change(index)'></evan-checkbox>
												</view>
												<!-- <view class="item-id">

													{{item.user_id}}

												</view> -->
												<view class="item-ph">

													{{String(item.username)}}
													<!-- {{String(item.username).slice(0,3)+'***'+String(item.username).slice(String(item.username).length-4,String(item.wallet_address).length)}} -->
												</view>
												<view class="item-addr"  @click="copyAddress(item.wallet_address)">

													{{String(item.wallet_address).slice(0,6)+'***'+String(item.wallet_address).slice(String(item.wallet_address).length-6,String(item.wallet_address).length)}}

												</view>
											</view>
										</view>

									</load-refresh>
								</view>
							</view>
						</view>


					</block>
					
					<block v-if="tabCurrentIndexTwo === 1">
						<view class="detail-type-form">

							<view class="container" style="padding-left: 50upx;">
								<view class="page-wrap">
									<view class="title title-alread">

										<!-- <view class="title-id">
											用户ID
										</view> -->
										<view class="title-ph">
											用户电话
										</view>
										<view class="title-addr">
											用户地址
										</view>
									</view>
									<load-refresh ref="loadRefresh" :isRefresh="true" refreshType="halfCircle"
										color="#04C4C4" fixedHeight='600' backgroundCover="#fff"
										:currentPage="currentPage" :totalPages="totalPages" @loadMore="loadMore"
										@refresh="refresh">
										<view slot="content-list">
											<!-- 数据列表 -->
											<view class="list-item list-item-alread" v-for="(item,index ) in listTwo" :key="index">
												<!-- <view class="item-id">

													{{item.user_id}}

												</view> -->
												<view class="item-ph">


													{{String(item.username).slice(0,3)+'***'+String(item.username).slice(String(item.username).length-4,String(item.wallet_address).length)}}
												</view>
												<view class="item-addr">

													{{String(item.wallet_address).slice(0,3)+'***'+String(item.wallet_address).slice(String(item.wallet_address).length-3,String(item.wallet_address).length)}}

												</view>
												
											</view>
										</view>

									</load-refresh>
									
								</view>
							</view>
						</view>

					</block>
					<view class="now-count" v-if="tabCurrentIndexTwo === 0">
						钱包总数：{{nowCount}}
					</view>
				</view>
				<!-- 加载框 -->
				<view class="loading" v-if="loading">
					<image src="../../static/loading.gif" mode=""></image>
				</view>
			</view>
			<view class="detail-type-content" v-if="tabCurrentIndexTwo === 0">
				<!-- <image class="login-bg" src="/static/login-bg.png" :style="{height: tabCurrentIndex === 1 ? '100%' : '100%'}"></image> -->
				<view class="main">
					<view class="nav-bar">
						<view class="nav-bar-item nav-bar-item-sub" v-for="(item, index) in typeList" :key="index"
							:class="tabCurrentIndex === index ? 'nav-bar-item-active text-active' : ''"
							@tap="tabClick(index)">
							{{ item.text }}
						</view>
					</view>
					<block v-if="tabCurrentIndex === 0">
						<view class="detail-type-form random-input">
							<input type="text" value="" placeholder="起始值" v-model="rBegin"/>
							<view class="line">
								一
							</view>
							<input type="text" value="" placeholder="终止值" v-model="rEnd" />


						</view>


						<button class="confirm-btn bg-active" @click="randomClick">
							投放
						</button>
					</block>
					<block v-if="tabCurrentIndex === 1">
						<view class="detail-type-form random-input">
							<input type="text" value="" placeholder="固定值"  v-model="cBegin"/>



						</view>
						<button class="confirm-btn bg-active" @click="cirClick">
							投放
						</button>

					</block>
				</view>

			</view>
			
		</view>

		<view class="uni-p-b-98"></view>
		<tabBar :pagePath="'/pages/shop/kt'"></tabBar>
	</view>


</template>
<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	export default {
		components: {
			loadRefresh
		},
		data() {
			return {


				btnLoading: false,
				reqBody: {},
				userInfo: null,
				tabCurrentIndex: 0,
				typeList: [{
						text: '随机空投'
					},
					{
						text: '定额空投'
					}
				],
				tabCurrentIndexTwo: 0,
				typeListTwo: [{
						text: '未空投'
					},
					{
						text: '已空投'
					}
				],
				loading: false,
				// option: {
				// 	page: 1,
				// 	size: 4,
				// 	auto: true,
				// 	height: 320,
				// 	offsetBottom: 10,
				// 	refresherThreshold: 80,
				// },
				// page: 1,

				currentPageT: 1, // 当前页码
				totalPagesT: 20, // 总页数
				currentPage: 1, // 当前页码
				totalPages: 20, // 总页数
				list: [],
				listTwo: [],
				checked: false,
				checkedAllList: [],
				userInfo: {},
				rBegin:1,
				rEnd:10,
				cBegin:0,
				nowCount:0
			};
		},

		onLoad(options) {
			var _self = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					_self.userInfo = JSON.parse(res.data);
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
						method: 'POST',
						dataType: 'json',
						data: {
							ISairdrop: true,
							page: 1,
							access_token: _self.userInfo.access_token,
						},
						success: function(res) {
							// _self.typeListTwo[1].text = '已空投'+'('+ res.data.count+')'
							if (res.data.ret == 200) {
								_self.listTwo = res.data.data;
							} else {

								uni.removeStorage({
									key: 'userInfo'
								})
								// uni.removeStorage({
								// 	key:'addressData' + _self.userData.user_id
								// })
								uni.navigateTo({
									url: '../user/login'
								})
							}
						},
						fail: function() {}
					})
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.WalletAddressCount',
						method: 'POST',
						dataType: 'json',
						data: {
							
							access_token: _self.userInfo.access_token,
						},
						success: function(res) {
							// console.log(res)
							_self.nowCount =  res.data.data.count;
							_self.totalPagesT = res.data.data.count/20;
							_self.totalPages = res.data.data.count/20;
						},
						fail: function() {}
					})
					uni.request({
						url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
						method: 'POST',
						dataType: 'json',
						data: {
							ISairdrop: false,
							page: 1,
							access_token: _self.userInfo.access_token,
						},
						success: function(res) {
							
							if (res.data.ret == 200) {
								_self.list = res.data.data;
								for (var i = 0; i < 20; i++) {
									_self.checkedAllList.push(false);
								}
							} else {

								uni.removeStorage({
									key: 'userInfo'
								})
								// uni.removeStorage({
								// 	key:'addressData' + _self.userData.user_id
								// })
								uni.navigateTo({
									url: '../user/login'
								})
							}
						},
						fail: function() {}
					})
				}
			});





		},
		onShow() {
			var _self = this;


			//
		},
		onUnload() {

		},
		methods: {



			// 统一跳转路由
			navTo(url) {
				uni.navigateTo({
					url
				});
			},

			// 积分兑换
			async toLogin() {
				var _self = this;
				var myDate = new Date();



			},
			// 切换兑换/哈希
			tabClick(index) {
				console.log('tabClick')
				this.tabCurrentIndex = index;
			},
			tabClickTwo(index) {
				console.log('tabClickTwo')
				this.tabCurrentIndexTwo = index;
			},
			selectionChange(obj) {
				console.log(obj)
			},
			// // 加载数据
			// load(paging) {
			// 	var _self = this;


			// 	// for (var i = 0; i < paging.size; i++) {
			// 	// 	list.push(i);
			// 	// }
			// 	_self.page++;
			// 	uni.request({
			// 		url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
			// 		method: 'POST',
			// 		dataType: 'json',
			// 		data: {
			// 			page: _self.page,
			// 			access_token: _self.userInfo.access_token,
			// 		},
			// 		success: function(res) {

			// 			if (res.data.ret == 200) {
			// 				_self.list = [..._self.list, ...res.data.data];
			// 				for (var i = 0; i < 20; i++) {
			// 					_self.checkedAllList.push(false);
			// 				}

			// 				_self.$refs.list.loadSuccess({
			// 					list: _self.list,
			// 					total: 200
			// 				});
			// 			} else {

			// 				uni.removeStorage({
			// 					key: 'userInfo'
			// 				})
			// 				// uni.removeStorage({
			// 				// 	key:'addressData' + _self.userData.user_id
			// 				// })
			// 				uni.navigateTo({
			// 					url: '../user/login'
			// 				})
			// 			}
			// 		}
			// 	})


			// 	// this.$refs.list.loadFail({ list: this.list, total: 10 })

			// },
			// // 刷新刷剧
			// refresh(paging) {
			// 	var _self = this;

			// 	console.log('refresh')
			// 	// let list = [];
			// 	// for (var i = 0; i < paging.size; i++) {
			// 	//   list.push(i);
			// 	// }
			// 	// this.list = list;
			// 	uni.request({
			// 		url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
			// 		method: 'POST',
			// 		dataType: 'json',
			// 		data: {
			// 			page: 1,
			// 			access_token: _self.userInfo.access_token,
			// 		},
			// 		success: function(res) {

			// 			if (res.data.ret == 200) {

			// 				_self.list = [...res.data.data];
			// 				_self.$refs.list.refreshSuccess({
			// 					list: _self.list,
			// 					total: 200
			// 				});
			// 				_self.checked = false;
			// 				for (var i = 0; i < 20; i++) {
			// 					_self.checkedAllList[i] = false;
			// 				}
			// 			} else {

			// 				uni.removeStorage({
			// 					key: 'userInfo'
			// 				})
			// 				// uni.removeStorage({
			// 				// 	key:'addressData' + _self.userData.user_id
			// 				// })
			// 				uni.navigateTo({
			// 					url: '../user/login'
			// 				})
			// 			}
			// 		}
			// 	})

			// 	// this.$refs.list.refreshFail({ list: this.list, total: 50 })

			// },

			change(index) {
				// console.log('e:', index);
			},
			changeAll() {
				// console.log('all')
				this.checkedAllList.forEach((item, index) => {
					this.checkedAllList[index] = this.checked
				})
			},

			// 已空投下拉列表方法
			// 上划加载更多
			loadMore() {
				var _self = this;
				// 模拟请求成功后的回调
				// setTimeout(() => {
				// 	// 1. list数组添加新数据
				// 	// 2. 更新当前页码 currentPage
				// 	// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				// }, 800)
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
					method: 'POST',
					dataType: 'json',
					data: {
						ISairdrop: true,
						page: _self.currentPage,
						access_token: _self.userInfo.access_token,
					},
					success: function(res) {
						// console.log(res)
						if (res.data.ret == 200) {
							_self.listTwo = [..._self.listTwo, ...res.data.data];
							_self.currentPage++;
							_self.$refs.loadRefresh.completed()

						} else {

							uni.removeStorage({
								key: 'userInfo'
							})
							// uni.removeStorage({
							// 	key:'addressData' + _self.userData.user_id
							// })
							uni.navigateTo({
								url: '../user/login'
							})
						}
					}
				})
			},
			// 下拉刷新数据列表
			refresh() {
				var _self = this;
				// 模拟请求成功后的回调
				// setTimeout(() => {
				// 	// 1. list重新赋值，应避免 this.list = [] 这种操作
				// 	// 2. 更新当前页码 currentPage
				// 	// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				// }, 1600)
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
					method: 'POST',
					dataType: 'json',
					data: {
						ISairdrop: true,
						page: 1,
						access_token: _self.userInfo.access_token,
					},
					success: function(res) {
						// console.log(res)
						if (res.data.ret == 200) {
							_self.listTwo = [...res.data.data];
							_self.currentPage = 1;
							_self.$refs.loadRefresh.completed()

						} else {

							uni.removeStorage({
								key: 'userInfo'
							})
							// uni.removeStorage({
							// 	key:'addressData' + _self.userData.user_id
							// })
							uni.navigateTo({
								url: '../user/login'
							})
						}
					}
				})
			},
			// 后期可将loadMore()与refresh()合并成一个函数方法去处理，因为本质上这两个方法只有在list赋值上面有不同
			// 代码触发下拉刷新方法
			runRefresh() {
				this.$refs.loadRefresh.runRefresh()
			},


			// 未空投下拉列表方法
			// 上划加载更多
			loadMoreT() {
				var _self = this;
				// 模拟请求成功后的回调
				// setTimeout(() => {
				// 	// 1. list数组添加新数据
				// 	// 2. 更新当前页码 currentPage
				// 	// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				// }, 800)
				_self.currentPageT++;
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
					method: 'POST',
					dataType: 'json',
					data: {
						ISairdrop: false,
						page: _self.currentPageT,
						access_token: _self.userInfo.access_token,
					},
					success: function(res) {
						if (res.data.ret == 200) {
							_self.list = [..._self.list, ...res.data.data];
							
							_self.$refs.loadRefreshT.completed()
							for (var i = 0; i < 20; i++) {
								_self.checkedAllList.push(false);
							}
						} else {

							uni.removeStorage({
								key: 'userInfo'
							})
							// uni.removeStorage({
							// 	key:'addressData' + _self.userData.user_id
							// })
							uni.navigateTo({
								url: '../user/login'
							})
						}
					}
				})
			},
			// 下拉刷新数据列表
			refreshT() {
				var _self = this;
				// 模拟请求成功后的回调
				// setTimeout(() => {
				// 	// 1. list重新赋值，应避免 this.list = [] 这种操作
				// 	// 2. 更新当前页码 currentPage
				// 	// 3. 调用completed()方法 this.$refs.loadRefresh.completed()
				// }, 1600)
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.UserAddressList',
					method: 'POST',
					dataType: 'json',
					data: {
						ISairdrop: false,
						page: 1,
						access_token: _self.userInfo.access_token,
					},
					success: function(res) {
						// console.log(res)
						if (res.data.ret == 200) {
							_self.list = [...res.data.data];
							_self.currentPageT = 1;
							_self.$refs.loadRefreshT.completed()
							for (var i = 0; i < 20; i++) {
								_self.checkedAllList.push(false);
							}
						} else {

							uni.removeStorage({
								key: 'userInfo'
							})
							// uni.removeStorage({
							// 	key:'addressData' + _self.userData.user_id
							// })
							uni.navigateTo({
								url: '../user/login'
							})
						}
					}
				})
			},
			// 后期可将loadMore()与refresh()合并成一个函数方法去处理，因为本质上这两个方法只有在list赋值上面有不同
			// 代码触发下拉刷新方法
			runRefreshT() {
				this.$refs.loadRefreshT.runRefresh()
			},

			// 随机兑换
			randomClick() {
				var _self = this;
				let address_list = [];
				let moble_List = [];
				// console.log(_self.userInfo.access_token)
				_self.checkedAllList.forEach((item, index) => {
					// console.log(_self.list[index].wallet_address,item)
					if (item) {
						moble_List.push(_self.list[index].username)
						address_list.push(_self.list[index].wallet_address)
						
					}

				})
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.Airdrop',
					method: 'POST',
					dataType: 'json',
					data: {
						ISairdrop: false,
						begin:_self.rBegin,
						end:_self.rEnd,
						random: true,
						access_token: _self.userInfo.access_token,
						address_list:address_list,
						mobile_list:moble_List
					},
					success:function(res){
						if(res.data.ret==200){
							// console.log('res',res.data)
							 uni.redirectTo({
							          url: 'kt',
							    });
						}else{
							 uni.showToast({  
							    title:res.data.msg,  
							    icon:"none"  
							
							}); 
						}
					}
				})
			},
			// 定额空投
			cirClick() {
				var _self = this;
				let address_list = [];
				let moble_List = [];
				_self.checkedAllList.forEach((item, index) => {
			
					if (item) {
						moble_List.push(_self.list[index].username)
						address_list.push(_self.list[index].wallet_address)
					}
					
			
				})
				uni.request({
					url: 'https://www.agnitoken.com/api/app.php?s=App.AgniAdmin.Airdrop',
					method: 'POST',
					dataType: 'json',
					data: {
						
						begin:_self.cBegin,
						// end:_self.rEnd,
						random: false,
						access_token: _self.userInfo.access_token,
						address_list:address_list,
						mobile_list:moble_List
					},
					success:function(res){
						if(res.data.ret==200){
							// console.log('res',res.data)
							 uni.redirectTo({
							          url: 'kt',
							    });
						}else{
							 uni.showToast({  
							    title:res.data.msg,  
							    icon:"none"  
							
							}); 
						}
					}
				})
			},
			
			//复制地址
			copyAddress(address){
				uni.setClipboardData({
				    data: address,
				    success: function () {
				       uni.showToast({
				           title:'复制到剪切板',  
				           icon:"none"  
				       
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

	.d-box {
		width: 100%;
		margin: 20upx auto 0;
		// box-shadow: 0 0 5px #666;
		// border-radius: 30upx;
		padding-bottom: 40upx;
	}

	.detail {
		width: 100%;
		height: auto;
		position: relative;
		overflow: hidden;
		padding-bottom: 10upx;
		.bg-active {

			// background-color: #FA446C;
			color: #fff;
			position: relative;



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
			padding-bottom: 60rpx;
			// min-height: 80vw;


			.detail-bg {
				width: 94vw;
				height: 94vw;
				margin: 0 3vw;
			}

			.main {
				width: 100vw;
				// position: absolute;
				top: 0;
				// left: 3vw;

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
						margin: 0 60rpx;
						justify-content: center;
					}

					.nav-bar-item-active {
						border-bottom: 5rpx solid;
					}
				}

				.detail-type-form {
					width: 100%;
					// min-height: 94vw;
					margin: 40rpx auto;

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
					width: 60%;
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

	// 下拉列表
	.page-wrap {
		background-color: #f1f1f1;
		position: relative;
		overflow: hidden;
	}

	.title {
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 999;
	}

	.title-checked {
		width: 10%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.title-alread{
		.title-ph {
			width: 50%;
			text-align: center;
			font-size: 16px;
		}
		
		.title-addr {
			width: 50%;
			text-align: center;
			font-size: 16px;
		}
	}
	.title-id {
		width: 20%;
		text-align: center;
		font-size: 12px;
	}

	.title-ph {
		width: 30%;
		text-align: center;
		font-size: 16px;
	}

	.title-addr {
		width: 60%;
		text-align: center;
		font-size: 16px;
	}

	.list-item {
		width: 100%;
		height: 60upx;
		margin-bottom: 10upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		font-size: 16px;
		text-align: center;
	}
	.list-item-alread{
		.item-ph{
			width: 50%;
		}
		.item-addr {
			width: 50%;
		}
	}
	.item-chekced {
		width: 10%;
	}

	.item-id {
		width: 20%;

	}

	.item-ph {
		width: 30%;

	}

	.item-addr {
		width: 60%;
	}


	.radio .uni-radio-input {
		border-radius: 0;
	}

	.random-input {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.random-input input {
		width: 120upx;
		height: 60upx;
		border: 1px solid #eee;
		text-align: center;
	}

	.random-input .line {
		margin: 0 30upx;
	}

	.load-refresh {
		background-color: #fff !important;
	}
	.uni-scroll-view{
		background-color: #fff;
	}
	.detail .detail-type-content .main .nav-bar .nav-bar-item-sub{
		font-size: 13px;
		margin:0 50px;
	}
	.now-count{
		width: 100%;
		padding-top: 30upx;
		text-align: center;
	}
</style>
