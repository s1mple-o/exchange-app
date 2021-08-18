<template>
	<view>
		<view class="head">
			<view class="search_input">
				<image src="../../static/img/search.png"></image>
				<input type="text" placeholder="请输入想搜索的文章" />
			</view>
		</view>
		<tab :lists="lists" :tab_color="tab_color" @switchover="switchover" :gauge="gauge"></tab>
		<!-- 占位符 -->
		<view style="width: 100%;height: 220rpx;"></view>
		<view class="special">
			<view class="special_list">
				<view class="special_list_top">
					<view class="left">
						标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题 标题标题标题
					</view>
					<view class="right">
						<image src="../../static/img/banner.png"></image>
					</view>
				</view>
				<view class="special_list_bottom">
					<text>
						来源：法院法院法院
					</text>
					<text>
						2021-03-21  19:40
					</text>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Tab from '../../components/Tab.vue';
	export default {
		components:{
			Tab
		},
		data() {
			return {
				//tab切换数组
				lists:[
					{id:1,name:'普法文章'},
					{id:2,name:'测试数据1'},
					{id:3,name:'测试数据测试数据'},
					{id:4,name:'测试数据阿萨德'},
					{id:5,name:'测试数据阿萨德'},
					{id:6,name:'测试数据大声道'},
					{id:7,name:'测试数据fff'},
					{id:8,name:'测试数据1'},
				
				],
				//tab切换选中的颜色
				tab_color:'#3b87f6',
				// tab组件position: fixed布局距离头部的位置大小（rpx）
				gauge:120
			};
		},
		methods:{
			switchover:function(id){
				console.log(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.head{
		width: 100%;
		height: 120rpx;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		background: #3b87f6;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0rpx;
		z-index: 99;
		.search_input {
			width: 100%;
			height: 60rpx;
			background: #fff;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
		
			image {
				width: 28rpx;
				height: 28rpx;
				margin-left: 26rpx;
			}
		
			input {
				font-size: 26rpx;
				margin-left: 25rpx;
			}
		}
	}
	.special{
		width: 100%;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		.special_list{
			width: 100%;
			height: 270rpx;
			border-bottom: 2rpx solid #e7e7e7;
			padding: 40rpx 0rpx;
			box-sizing: border-box;
			.special_list_top{
				display: flex;
				justify-content: space-between;
				.left{
					width: 65%;
					height: 140rpx;
					line-height: 46rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
				.right{
					width: 30%;
					height: 140rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			.special_list_bottom{
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
</style>
