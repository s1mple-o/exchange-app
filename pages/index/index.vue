<template>
	<view class="">
		<tab :lists="lists" :tab_color="tab_color" @switchover="switchover" :gauge="gauge"></tab>
		<view class="icon">
			<view class="icon-title">
				<view class="type title-b">
					币种
				</view>
				<view class="price title-b">
					最新价
				</view>
				<view class="updown title-b">
					涨跌幅
				</view>
			</view>
			<view class="item" v-for="item in currentList" >
				<view class="icon-name item-b">
					<image :src="'https://www.agnitoken.com'+item.icon" mode=""></image>
					<text style="overflow: hidden;">{{item.symbol}} <text class="name-ch"></text></text>
				</view>
				<view class="icon-price item-b" style="overflow: hidden;">
					${{(item.close).toFixed(8)}}
					
				</view>
				<view class="icon-updown item-b">
					<view :class="parseInt(((item.close/item.open)-1)*100)>0?'updown-box red':'updown-box green'">
						{{item.close/item.open?(((item.close/item.open)-1)*100).toFixed(2):0}}%
					</view>
				</view>
			</view>
		</view>
		<view class="uni-p-b-98"></view>
		<tabBar :pagePath="'/pages/index/index'"></tabBar>
		<!-- 加载框 -->
		<view class="loading" v-if="loading">
			<image src="../../static/loading.gif" mode=""></image>
		</view>
	</view>
</template>

<script>
	import Tab from '../../components/Tab.vue';
	export default {
		components: {
			Tab
		},
		data() {
			return {
				lists: [{
						id: 1,
						name: 'USDT'
					},
					{
						id: 2,
						name: 'BTC'
					},
					{
						id: 3,
						name: 'ETH'
					},
					{
						id: 4,
						name: 'HT'
					}

				],
				//tab切换选中的颜色
				tab_color: '#3b87f6',
				// tab组件position: fixed布局距离头部的位置大小（rpx）
				gauge: 60,
				currentId:1,
				currentName:'usdt',
				currentList:[],
				userInfo:{},
				loading: false
				
			}
		},
		onLoad() {
			var _self = this
			this.loading = true;
			uni.request({
					url:'https://www.agnitoken.com/api/app.php?s=App.Agni.Tickers',
					method:'POST',
					dataType:'json',
					data:{
						token_name:_self.currentName
					},
					success:function(res){
						// console.log(res.data.data.length)
						// console.log(res.data)
						if(res.data.ret==200){
							_self.currentList =res.data.data;
							_self.loading = false;
							
						}
						else{
							uni.showToast({ title: res.data.msg,icon:'none' });
						}
					}
				})
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					_self.userInfo = JSON.parse(res.data);
					
				},fail: (res) => {
					
				}
			})
			
		},
		methods: {
			switchover: function(id) {
				var _self = this
				if(id==1){
					this.currentName = 'usdt';
					_self.loading = true
					uni.request({
							url:'https://www.agnitoken.com/api/app.php?s=App.Agni.Tickers',
							method:'POST',
							dataType:'json',
							data:{
								token_name:_self.currentName
							},
							success:function(res){
								// console.log(res.data.data.length)
								// console.log(res.data)
								if(res.data.ret==200){
									_self.currentList =res.data.data;
									_self.loading = false
									
								}
								else{
									uni.showToast({ title: res.data.msg,icon:'none' });
								}
							}
						})
				}else if (id==2){
					this.currentName ='btc';
					_self.loading = true
					uni.request({
							url:'https://www.agnitoken.com/api/app.php?s=App.Agni.Tickers',
							method:'POST',
							dataType:'json',
							data:{
								token_name:_self.currentName
							},
							success:function(res){
								// console.log(res.data.data.length)
								// console.log(res.data)
								if(res.data.ret==200){
									_self.currentList =res.data.data;
									_self.loading = false
									
								}
								else{
									uni.showToast({ title: res.data.msg,icon:'none' });
								}
							}
						})
				}else if(id==3){
					this.currentName = 'eth';
					uni.request({
							url:'https://www.agnitoken.com/api/app.php?s=App.Agni.Tickers',
							method:'POST',
							dataType:'json',
							data:{
								token_name:_self.currentName
							},
							success:function(res){
								// console.log(res.data.data.length)
								// console.log(res.data)
								if(res.data.ret==200){
									_self.currentList =res.data.data;
									
									
								}
								else{
									uni.showToast({ title: res.data.msg,icon:'none' });
								}
							}
						})
				}else if(id==4){
					this.currentName = 'ht';
					uni.request({
							url:'https://www.agnitoken.com/api/app.php?s=App.Agni.Tickers',
							method:'POST',
							dataType:'json',
							data:{
								token_name:_self.currentName
							},
							success:function(res){
								// console.log(res.data.data.length)
								// console.log(res.data)
								if(res.data.ret==200){
									_self.currentList =res.data.data;
									
									
								}
								else{
									uni.showToast({ title: res.data.msg,icon:'none' });
								}
							}
						})
				}
			}

		}
	}
</script>

<style scoped>
.icon{
	width: 100%;
	/* padding-top: 120upx; */
}
.icon-title{
	display: flex;
	justify-content: space-between;
	padding: 30upx;
}
.title-b{
	/* flex: 1; */
	/* width: 33.3%; */
}
.icon-title .type{
	box-sizing: border-box;
	/* flex: 1; */
	/* padding-left: 30upx; */
	/* background-color: #18B566; */
	width: 20%;
	text-align: center;
}
.price{
	width: 50%;
	text-align: center;
	/* background-color: red; */
}
.updown{
	box-sizing: border-box;
	width: 25%;
	padding-left: 70upx;
	/* text-align: center; */
	/* background-color:#007AFF ; */
}
.item{
	padding: 25upx 30upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.item-b{
	width: 33.3%;
}

.item .icon-name {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.name-ch{
	font-size: 12px;
	color: #3f3f3f;
	margin-left: 10upx;
}
.icon-name image{
	width: 50upx;
	height: 50upx;
	margin-right: 10upx;
}

.icon-name {
	/* background-color:#008000; */
	width: 25%;
}
.icon-price{
	/* background-color: red; */
	box-sizing: border-box;
	padding-left: 40upx;
	width: 50%;
}
.icon-updown{
	width: 25%;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	/* background-color: #007AFF; */
}
.updown-box{
	width: 120upx;
	height: 50upx;
	background-color: red;
	line-height: 50upx;
	text-align: center;
	color: #fff;
	font-size: 12px;
	border-radius: 10upx;
}
.red{
	background-color: red;
}
.green{
	background-color: green;
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
