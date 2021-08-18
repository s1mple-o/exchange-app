<template>
	<view >
		<view class="tab" :style="{'top':gauge+'rpx'}">
			<scroll-view class="tab_scroll" :scroll-x="true" :scroll-into-view="intoindex">
				<view :class="tab_index==index?'tab_scroll_list':'tab_scroll_lists'" :id='"tab"+index'
					:style="{'color':tab_index==index?tab_color:''}" v-for="(item,index) in lists" :key="index"
					@tap="cut(index,item.id)">
					{{item.name}}
				</view>
				<!-- 占位符 -->
				<!-- <view class="tab_scroll_list"></view> -->
			</scroll-view>
			<!-- 多个tab时显示下拉框 -->
			<view class="pull" v-if="lists.length>6" @tap="open">
				<image src="../static/img/pull.png"></image>
			</view>
		</view>
		<!-- 遮挡弹出 -->
		<view class="popup" v-show="or">
		</view>
		<view :class="or?'popup_list':'popup_lists'" :style="{'top':gauge+100+'rpx'}">
			<view class="label" v-show="or_text">
				<scroll-view class="label_scroll" :scroll-y="true">
					<view class="label_list" v-for="(item,index) in lists" :key="index"
						:style="{'background':tab_index==index?tab_color:''}" @tap="cut(index,item.id)">
						{{item.name}}
					</view>
				</scroll-view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Tab",
		data() {
			return {
				//tab选中的下标
				tab_index: 0,
				//是否开启下拉
				or: false,
				or_text: false,
				intoindex: ''
			};
		},
		props: {
			lists: {
				type: Array,
				default: []
			},
			tab_color: {
				type: String,
				default: ''
			},
			gauge:{
				type:Number,
				default:0
			}
		},
		methods: {
			cut: function(ind,id) {
				var that = this;
				that.tab_index = ind;
				that.or = false;
				that.or_text = false;
				that.$nextTick(() => {
					that.intoindex = "tab" + ind
				});
				that.intoindex = ''
				that.$emit('switchover',id)
			},
			// 打开下拉
			open: function() {
				var that = this;
				that.or = !that.or;
				if (that.or) {
					setTimeout(() => {
						// 这里添加您的逻辑		
						that.or_text = true;
					}, 300)
				} else {
					that.or_text = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		width: 100%;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #e7e7e7;
		// position: fixed;
		background: #fff;
		z-index: 99;
		.tab_scroll {
			width: 100%;
			height: 100rpx;
			white-space: nowrap;
			line-height: 100rpx;

			.tab_scroll_list {
				display: inline-block;
				font-size: 28rpx;
				margin-right: 40rpx;
				position: relative;
			}

			.tab_scroll_lists {
				display: inline-block;
				font-size: 28rpx;
				margin-right: 40rpx;
				position: relative;
			}

			.tab_scroll_list:after {
				position: absolute;
				bottom: 0;
				text-align: center;
				left: 30%;

				content: "";
				width: 20rpx;
				height: 4rpx;
				border-top: 4rpx solid #3b87f6;
			}
		}

		.pull {
			width: 80rpx;
			height: 98rpx;
			position: absolute;
			right: 0rpx;
			top: 0rpx;
			z-index: 999;
			background: #fff;
			box-shadow: #000 -5rpx 0px 5px -5px;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}

	}

	.popup {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		position: absolute;
		top: 0rpx;
		z-index: 10;
	}

	.popup_list {
		width: 100%;
		height: 280rpx;
		background: #fff;
		transition: height .5s;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
		.label {
			width: 100%;

			.label_scroll {
				width: 100%;
				height: 280rpx;
				padding: 20rpx 0rpx;
				box-sizing: border-box;

				.label_list {
					font-size: 28rpx;
					color: #fff;
					padding: 10rpx 10rpx;
					border-radius: 50rpx;
					background: #C0C0C0;
					display: inline-block;
					margin-top: 20rpx;
					margin-right: 20rpx;
				}
			}

		}


	}

	.popup_lists {
		width: 100%;
		height: 0rpx;
		background: #fff;
		transition: height .5s;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		position: fixed;
		z-index: 99;
	}
</style>
